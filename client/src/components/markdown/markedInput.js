import { useContext, useEffect } from "react";
import MarkdownContext from "../../store/markdown-context";
import { io } from "socket.io-client";

import CodeMirror from "@uiw/react-codemirror";

import "codemirror/lib/codemirror.css";

import "codemirror/theme/monokai.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/material.css";

import "codemirror/addon/selection/active-line";

import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";

import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";

import "codemirror/mode/markdown/markdown";

const SAVE_INTERVAL = 60000;

const socket = io("http://localhost:4000", { transports: ["websocket"] });

const MarkedInput = ({ groupId }) => {
  const { markdownText, setMarkdownText } = useContext(MarkdownContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:4000/groups/${groupId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.text();
          setMarkdownText(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    })();

    const eventName = `new-remote-operations-${groupId}`;

    socket.on(eventName, (val) => setMarkdownText(val));

    const interval = setInterval(() => {
      socket.emit("save-document", { value: markdownText, groupId });
    }, SAVE_INTERVAL);

    return () => {
      socket.off(eventName);
      clearInterval(interval);
    };
  }, [socket, groupId]);

  return (
    <div className="min-h-full max-h-full p-8 shadow-xl">
      <CodeMirror
        value={markdownText}
        options={{
          theme: "material",
          mode: "markdown",
          line: true,
          lineNumbers: true,
          tabSize: 2,
          styleActiveLine: true,
          lineWrapping: true,
          foldGutter: true,
        }}
        onChange={(instance, changes) => {
          const { origin } = changes;

          if (origin !== "setValue") {
            socket.emit("new-operations", {
              value: instance.getValue(),
              groupId,
            });
          }
        }}
      />
    </div>
  );
};

export default MarkedInput;

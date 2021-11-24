import { createContext, useState } from "react";

const MarkdownContext = createContext({
  markdownText: "",
  setMarkdownText: () => {},
});

export function MarkdownContextProvider(props) {
  const [markdownText, setMarkdownText] = useState("");

  const context = {
    markdownText,
    setMarkdownText,
  };

  return (
    <MarkdownContext.Provider value={context}>
      {props.children}
    </MarkdownContext.Provider>
  );
}

export default MarkdownContext;

import React, { useContext } from "react";
import MarkdownContext from "../../store/markdown-context";
import MarkdownPreview from "@uiw/react-markdown-preview";

const Result = (props) => {
  const { markdownText } = useContext(MarkdownContext);

  return (
    <div className="max-h-full p-8 overflow-scroll">
      <MarkdownPreview source={markdownText} />
    </div>
  );
};

export default Result;

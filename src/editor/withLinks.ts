import { EditorElementFormat } from "./types";
import { ReactEditor } from "slate-react";

export const withLinks = (editor: ReactEditor) => {
  const { isInline } = editor;

  editor.isInline = (element) => {
    return element.type === EditorElementFormat.link ? true : isInline(element);
  };

  return editor;
};

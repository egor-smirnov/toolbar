import { Editor, Transforms, Range } from "slate";
import { EditorElementFormat, EditorLeafFormat } from "../types";

export const EditorCommands = {
  isLeafFormatActive(editor: Editor, format: EditorLeafFormat) {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },
  toggleLeafFormat(editor: Editor, format: EditorLeafFormat) {
    const isActive = EditorCommands.isLeafFormatActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },
  isBlockActive(editor: Editor, format: EditorElementFormat) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === format,
    });

    return !!match;
  },
  insertLink(editor: Editor, url: string, selection: Range | null) {
    if (url && selection) {
      EditorCommands.wrapLink(editor, url, selection);
    }
  },
  wrapLink(editor: Editor, url: string, selection: Range) {
    const isLinkActive = EditorCommands.isBlockActive(
      editor,
      EditorElementFormat.link,
    );
    if (isLinkActive) {
      EditorCommands.unwrapLink(editor, selection);
    }

    const link = {
      type: "link",
      url,
      children: [],
    };
    Transforms.wrapNodes(editor, link, { at: selection, split: true });
  },
  unwrapLink(editor: Editor, selection: Range) {
    Transforms.unwrapNodes(editor, {
      at: selection,
      match: (n) => n.type === EditorElementFormat.link,
    });
  },
};

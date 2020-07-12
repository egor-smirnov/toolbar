import { useEffect, useState } from "react";
import { ReferenceObject } from "popper.js";
import { ReactEditor, useSlate } from "slate-react";
import { Editor, Range } from "slate";

const useHovering = (linkState: string | null) => {
  const editor = useSlate();

  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<ReferenceObject | null>(null);

  useEffect(() => {
    const handler = () => {
      const { selection } = editor;

      if (
        linkState === null &&
        (!selection ||
          !ReactEditor.isFocused(editor) ||
          Range.isCollapsed(selection) ||
          Editor.string(editor, selection) === "")
      ) {
        setOpen(false);
        return;
      } else if (typeof linkState === "string") {
        // dont close the popper when editing link
        return;
      }

      const domSelection = window.getSelection();

      if (domSelection) {
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();

        setOpen(true);
        setAnchorEl({
          getBoundingClientRect: () => ({
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom - 60,
            left: rect.left,
            width: 0,
            height: 0,
          }),
          clientWidth: 0,
          clientHeight: 0,
        });
      }
    };
    document.addEventListener("selectionchange", handler);
    return () => {
      document.removeEventListener("selectionchange", handler);
    };
  }, [linkState]);

  return {
    anchorEl,
    open,
  };
};

export default useHovering;

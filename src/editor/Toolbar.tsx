import React, { useState } from "react";
import { Popper } from "@material-ui/core";
import { useSlate } from "slate-react";
import { Range } from "slate";

import { useStyles } from "./Toolbar.styles";
import { LinkForm, ToolbarButtons } from "./components";
import { EditorCommands } from "./commands";
import useHovering from "./useHovering";

export function Toolbar() {
  const [link, setLink] = useState<string | null>(null);
  const [editorSelection, setEditorSelection] = useState<Range | null>(null);

  const s = useStyles();
  const editor = useSlate();

  const { open: popperOpen, anchorEl: popperAnchorEl } = useHovering(link);

  return (
    <Popper className={s.root} open={popperOpen} anchorEl={popperAnchorEl}>
      {link === null ? (
        /* Formatting controls */
        <ToolbarButtons
          onLinkClick={() => {
            setEditorSelection(editor.selection);
            setLink("");
          }}
        />
      ) : (
        /* URL input field */
        <LinkForm
          textInputValue={link}
          onTextInputChange={(x) => setLink(x.target.value)}
          onCancel={() => setLink(null)}
          onFormSubmit={() => {
            EditorCommands.insertLink(editor, link, editorSelection);
            setLink(null);
          }}
        />
      )}
    </Popper>
  );
}

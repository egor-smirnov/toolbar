import React from "react";
import { Editor, Transforms, Text } from "slate";

import {
  Popper,
  PopperProps,
  ButtonGroup,
  IconButton,
  Input,
} from "@material-ui/core";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Link,
  Close,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.common.black,
  },
  button: {
    color: theme.palette.common.white,
    opacity: 0.75,
    "&:hover": {
      opacity: 1,
    },
    paddingTop: 8,
    paddingBottom: 8,
  },
  input: {
    color: theme.palette.common.white,
    padding: theme.spacing(0.25, 1),
  },
  close: {
    opacity: 0.75,
    cursor: "pointer",
    "&:hover": {
      opacity: 1,
    },
  },
}));

const toggleFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true },
  );
};

const isFormatActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: "all",
  });
  return !!match;
};

export interface ToolbarProps extends Omit<PopperProps, "children"> {
  editorInstance: Editor;
}

export function Toolbar(props: ToolbarProps) {
  const [link, setLink] = React.useState<string | null>(null);
  const s = useStyles();

  return (
    <Popper className={s.root} {...props}>
      {link === null ? (
        /* Formatting controls */
        <ButtonGroup variant="text" color="primary">
          <IconButton className={s.button} size="small">
            <FormatBold
              fontSize="small"
              onMouseDown={(event) => {
                event.preventDefault();
                toggleFormat(props.editorInstance, "bold")
              }}
            />
          </IconButton>
          <IconButton className={s.button} size="small">
            <FormatItalic
              fontSize="small"
              onMouseDown={(event) => {
                event.preventDefault();
                toggleFormat(props.editorInstance, "italic")
              }}
            />
          </IconButton>
          <IconButton className={s.button} size="small" active={isFormatActive(props.editorInstance, "underline")}>
            <FormatUnderlined
              fontSize="small"
              onMouseDown={(event) => {
                event.preventDefault();
                toggleFormat(props.editorInstance, "underline")
              }}
            />
          </IconButton>
          <IconButton
            className={s.button}
            size="small"
            onClick={() => setLink("")}
          >
            <Link fontSize="small" />
          </IconButton>
        </ButtonGroup>
      ) : (
        /* URL input field */
        <form onSubmit={(x) => x.preventDefault()}>
          <Input
            className={s.input}
            type="url"
            value={link}
            onChange={(x) => setLink(x.target.value)}
            endAdornment={
              <Close
                className={s.close}
                fontSize="small"
                onClick={() => setLink(null)}
              />
            }
            placeholder="https://"
            disableUnderline
            fullWidth
            autoFocus
          />
        </form>
      )}
    </Popper>
  );
}

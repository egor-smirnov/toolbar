import React from "react";

import clsx from "clsx";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { useSlate } from "slate-react";

import { useStyles } from "./Button.styles";
import { EditorLeafFormat } from "../types";
import { EditorCommands } from "../commands";

export interface LeafFormatButtonProps extends ButtonProps {
  format: EditorLeafFormat;
  icon: JSX.Element;
}

export function LeafFormatButton(props: LeafFormatButtonProps) {
  const { format, icon, className, ...otherProps } = props;

  const s = useStyles();
  const editor = useSlate();

  return (
    <Button
      {...otherProps}
      className={clsx(className, {
        [s.button]: true,
        [s.selected]: EditorCommands.isLeafFormatActive(editor, format),
      })}
      size="small"
      onMouseDown={(event) => {
        event.preventDefault();
        EditorCommands.toggleLeafFormat(editor, format);
      }}
    >
      {icon}
    </Button>
  );
}

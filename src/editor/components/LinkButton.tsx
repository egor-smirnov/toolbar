import { ButtonProps } from "@material-ui/core/Button";
import { Link } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import { useSlate } from "slate-react";

import { useStyles } from "./Button.styles";
import { EditorCommands } from "../commands";
import { EditorElementFormat } from "../types";

export interface LinkButtonProps extends ButtonProps {
  onClick: () => void;
}

export function LinkButton(props: LinkButtonProps) {
  const { onClick, className, ...otherProps } = props;

  const s = useStyles();
  const editor = useSlate();

  return (
    <Button
      {...otherProps}
      className={clsx(className, {
        [s.button]: true,
        [s.selected]: EditorCommands.isBlockActive(
          editor,
          EditorElementFormat.link,
        ),
      })}
      size="small"
      onMouseDown={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      <Link fontSize="small" />
    </Button>
  );
}

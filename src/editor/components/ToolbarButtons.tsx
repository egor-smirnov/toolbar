import React from "react";
import { FormatBold, FormatItalic, FormatUnderlined } from "@material-ui/icons";
import { ButtonGroup } from "@material-ui/core";

import { LeafFormatButton } from "./LeafFormatButton";
import { EditorLeafFormat } from "../types";
import { LinkButton } from "./LinkButton";

export interface ToolbarButtonsProps {
  onLinkClick: () => void;
}

export function ToolbarButtons(props: ToolbarButtonsProps) {
  const { onLinkClick } = props;

  return (
    <ButtonGroup variant="text" color="primary">
      <LeafFormatButton
        format={EditorLeafFormat.bold}
        icon={<FormatBold fontSize="small" />}
      />
      <LeafFormatButton
        format={EditorLeafFormat.italic}
        icon={<FormatItalic fontSize="small" />}
      />
      <LeafFormatButton
        format={EditorLeafFormat.underline}
        icon={<FormatUnderlined fontSize="small" />}
      />
      <LinkButton onClick={onLinkClick} />
    </ButtonGroup>
  );
}

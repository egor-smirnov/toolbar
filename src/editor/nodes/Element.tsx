import React from "react";
import { Typography, TypographyProps } from "@material-ui/core";
import { RenderElementProps } from "slate-react";

import { EditorElementFormat } from "../types";

export const Element = React.forwardRef(function Element(
  props: TypographyProps & RenderElementProps,
  ref: React.Ref<HTMLElement>,
) {
  const { attributes, element, children } = props;
  switch (element.type) {
    case EditorElementFormat.link:
      return (
        <a {...attributes} href={element.url as string}>
          {children}
        </a>
      );
    default:
      return <Typography ref={ref} {...props} />;
  }
});

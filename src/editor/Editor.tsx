import React, { useCallback } from "react";
import { createEditor, Node } from "slate";
import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";

import { Element, Leaf } from "./nodes";
import { Toolbar } from "./Toolbar";
import { withLinks } from "./withLinks";

function renderElement(props: RenderElementProps) {
  const { children, ...otherProps } = props;
  return <Element {...otherProps}>{children}</Element>;
}

function renderLeaf(props: RenderLeafProps) {
  const { children, ...otherProps } = props;
  return <Leaf {...otherProps}>{children}</Leaf>;
}

export interface EditorProps {
  value: Node[];
  onChange: (value: Node[]) => void;
  placeholder?: string;
  autoFocus?: boolean;
  spellCheck?: boolean;
}

export function Editor(props: EditorProps) {
  const { value, onChange, ...other } = props;

  const editor = React.useMemo(() => withLinks(withReact(createEditor())), []);
  const memoizedRenderElement = useCallback(renderElement, []);
  const memoizedRenderLeaf = useCallback(renderLeaf, []);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Toolbar />
      <Editable
        renderElement={memoizedRenderElement}
        renderLeaf={memoizedRenderLeaf}
        {...other}
      />
    </Slate>
  );
}

export { Node };

import React from "react";
import { Close } from "@material-ui/icons";
import { Input } from "@material-ui/core";

import { useStyles } from "./LinkForm.styles";

export interface LinkFormProps {
  onFormSubmit: () => void;
  textInputValue: string | null;
  onTextInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
}

export function LinkForm(props: LinkFormProps) {
  const { onFormSubmit, textInputValue, onTextInputChange, onCancel } = props;
  const s = useStyles();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit();
      }}
    >
      <Input
        className={s.input}
        type="url"
        value={textInputValue}
        onChange={onTextInputChange}
        endAdornment={
          <Close className={s.close} fontSize="small" onClick={onCancel} />
        }
        placeholder="https://"
        disableUnderline
        fullWidth
        autoFocus
      />
    </form>
  );
}

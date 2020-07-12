import React from "react";
import {
  CssBaseline,
  MuiThemeProvider,
  Container,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

import theme from "./theme";
import { Editor, Node } from "./editor";
import { useStyles } from "./App.styles";

const initialValue: Node[] = [
  {
    type: "paragraph",
    children: [
      { text: "Regular paragraph with " },
      { text: "some bold text ", bold: true },
      { text: "and " },
      { text: "some italic text ", italic: true },
      { text: "and " },
      { text: "some underline text", underline: true },
      { text: " and " },
      {
        type: "link",
        url: "https://www.google.com/",
        children: [{ text: "some link" }],
      },
    ],
  },
];

export function App() {
  const [value, setValue] = React.useState(initialValue);
  const s = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={s.root} maxWidth="sm">
        <Typography className={s.title} component="h1" variant="h5">
          Slate.js Sandbox
        </Typography>
        <Card className={s.card} elevation={0}>
          <CardContent>
            <Editor
              value={value}
              onChange={(x) => setValue(x)}
              placeholder="Write text here..."
              autoFocus
              spellCheck={false}
            />
          </CardContent>
        </Card>
      </Container>
    </MuiThemeProvider>
  );
}

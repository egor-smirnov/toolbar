import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
  title: {
    margin: theme.spacing(0, 2, 2),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
}));

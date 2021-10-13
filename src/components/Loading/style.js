import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex + 2,
    color: "#fff",
  },
}));

export default useStyles;
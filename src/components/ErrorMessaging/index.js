import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/core/Alert";

export default function ErrorMessaging(props) {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Snackbar open={props.erro ? true : false} autoHideDuration={6000}>
      <Alert severity="error">{props.erro}</Alert>
    </Snackbar>
  );
}
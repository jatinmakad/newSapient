import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import ToastComponent from "./TaostComponent";
import {
  UpdateAssignFunction,
  UpdateCommentFunction,
} from "../../Slice/CoordinationSlice";

export default function CommentDialog({
  open,
  handleClose,
  id,
  data,
  dispatch,
}) {
  const [input, setInput] = React.useState("");
  const Submit = () => {
    if (input === "") {
      ToastComponent("Please Enter Comment", "error");
    } else {
      const obj = {
        comment: input,
        userId: id,
        uniqueJobId: data.uniqueJobId,
      };
      dispatch(UpdateCommentFunction(obj));
      const taskData = {
        userId: id,
        uniqueJobId: data.uniqueJobId,
        currentJobHolder: data.entryHandledBy,
      };
      dispatch(UpdateAssignFunction(taskData));
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            style={{ textAlign: "left" }}
            hintText="Message Field"
            fullWidth
            placeholder="Add Comment"
            floatingLabelText="MultiLine and FloatingLabel"
            multiline
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={Submit} variant="contained" color="info">
            Add
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

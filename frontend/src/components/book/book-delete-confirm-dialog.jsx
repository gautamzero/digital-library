import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function BookDeleteConfirmDialog(props) {
  const {
    open,
    bookToDelete,
    handleDialogClose,
    resetBookList,
  } = props;

  function deleteBook () {
    axios.delete(`http://localhost:5000/api/books/${bookToDelete._id}`)
      .then(function (response) {
        // handle success
        if (response.status === 200) {
          resetBookList();
        }
        else {
          console.log(response);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        handleDialogClose();
      });
  }

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete Book"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {bookToDelete?.title}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={deleteBook} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
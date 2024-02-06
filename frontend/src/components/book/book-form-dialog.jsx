import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function BookFormDialog(props) {
  const {
    action='add',
    bookFormContent,
    open,
    handleDialogClose,
    resetBookList,
  } = props;

  function handleBookFormSubmit (payload) {
    switch (action) {
      case 'add':
        addBook(payload)
        break;
      case 'edit':
        updateBook(payload);
        break;
      default:
        console.log('NO ACTION');
    }

  }

  function addBook (book) {
    axios.post('http://localhost:5000/api/books', {
      title: book.title,
      author: book.author,
      publicationYear: book.publicationYear,
      summary: book.summary,
    })
      .then(function (response) {
        // handle success
        if (response.status === 200) {
          resetBookList(true);
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

  function updateBook (book) {
    axios.put(`http://localhost:5000/api/books/${book.id}`, {
      title: book.title,
      author: book.author,
      publicationYear: book.publicationYear,
      summary: book.summary,
    })
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
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          handleBookFormSubmit(formJson);
        },
      }}
    >
      <DialogTitle>{action === 'add' ? 'Add New' : 'Edit'} Book</DialogTitle>
      <DialogContent>

        <TextField
          sx={{ display: 'none' }}
          id="id"
          name="id"
          label="ID"
          type="text"
          defaultValue={bookFormContent?._id}
        />

        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Book Title"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={bookFormContent?.title}
        />

        <TextField
          required
          margin="dense"
          id="author"
          name="author"
          label="Author"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={bookFormContent?.author}
        />

        <TextField
          required
          margin="dense"
          id="publicationYear"
          name="publicationYear"
          label="Publication Year"
          type="number"
          fullWidth
          variant="standard"
          defaultValue={bookFormContent?.publicationYear}
        />

        <TextField
          id="summary"
          label="Summary"
          name="summary"
          multiline
          rows={4}
          fullWidth
          defaultValue={bookFormContent?.summary}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
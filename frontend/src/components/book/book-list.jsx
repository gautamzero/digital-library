import * as React from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function BookList() {
  const [books, setBooks] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [summaryId, setSummaryId] = React.useState(null);

  const [showDialog, setShowDialog] = React.useState(false);
  const [bookToDelete, setBookToDelete] = React.useState(null);

  const [showBookFormDialog, setShowBookFormDialog] = React.useState(false);
  const [bookToEdit, setBookToEdit] = React.useState({
    title: '',
    author: '',
    publicationYear: 2024,
    summary: '',
  });

  const handleDialogClose = () => {
    setShowDialog(false);
    setShowBookFormDialog(false);
  };

  const handleEdit = (book) => {
    setBookToEdit(book);
    setShowBookFormDialog(true);
  };

  const handleDelete = (book) => {
    setBookToDelete(book);
    setShowDialog(true);
  };


  const onClickSummary = (id) => {
    if (summaryId === id) {
      setSummaryId(null);
    }
    else {
      setSummaryId(id);
    }
  };

  const onPageChange = (event, page) => {
    setPage(page);
    fetchBooks((page - 1) * 10);
  };

  const updateBook = (book) => {
    axios.put(`http://localhost:5000/api/books/${book.id}`, {
      title: book.title,
      author: book.author,
      publicationYear: book.publicationYear,
      summary: book.summary,
    })
      .then(function (response) {
        // handle success
        if (response.status === 200) {
          fetchBooks((page - 1) * 10);
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

  const fetchBooks = (offset) => {
    axios.get(`http://localhost:5000/api/books?limit=10&offset=${offset}`)
      .then(function (response) {
        // handle success
        if (response.status === 200) {
          setBooks(response.data.results);
          setCount(Math.ceil(response.data.totalCount / 10));
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
        // always executed
      });
  }

  React.useEffect(() => {
    fetchBooks(0);
    return () => { };
  }, [])

  return (
    <Container maxWidth="md">
      <Box sx={{ height: '100vh' }}>
        <Pagination count={count} onChange={onPageChange} />
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {books.map((book) => (<React.Fragment key={book._id}>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <Box>
                  <Chip label={summaryId === book._id ? "Hide summary" : "See summary"} variant="outlined" size='small' onClick={() => onClickSummary(book._id)} />
                  <IconButton size="small" aria-label="edit" onClick={() => handleEdit(book)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" aria-label="delete" onClick={() => handleDelete(book)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={book.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {book.author}
                    </Typography>
                    <Chip sx={{ marginLeft: '10px' }} size='small' label={book.publicationYear} />
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <Collapse in={summaryId === book._id} >
              <Box sx={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.06)' }}>
                <Typography variant="subtitle2" sx={{ padding: '10px 20px 10px 20px' }}>
                  Summary
                </Typography>
                <Box sx={{ maxHeight: '100px', overflow: 'auto', padding: '0 20px 20px 20px' }}>
                  <Typography variant="caption">
                    {book.summary}
                  </Typography>
                </Box>
              </Box>
            </Collapse>
          </ React.Fragment>))}
        </List>
      </ Box>

      <Dialog
        open={showDialog}
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
          <Button onClick={handleDialogClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showBookFormDialog}
        onClose={handleDialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            updateBook(formJson);
          },
        }}
      >
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>

          <TextField
            sx={{ display: 'none' }}
            id="id"
            name="id"
            label="ID"
            type="text"
            defaultValue={bookToEdit._id}
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
            defaultValue={bookToEdit.title}
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
            defaultValue={bookToEdit.author}
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
            defaultValue={bookToEdit.publicationYear}
          />

          <TextField
            id="summary"
            label="Summary"
            name="summary"
            multiline
            rows={4}
            fullWidth
            defaultValue={bookToEdit.summary}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
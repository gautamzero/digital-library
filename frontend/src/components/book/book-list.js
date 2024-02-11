import * as React from 'react';
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';

import BookFormDialog from './book-form-dialog';
import BookDeleteConfirmDialog from './book-delete-confirm-dialog';
import BookSummary from './book-summary';

import { fetchBooksAPI } from '../../apis/bookAPIs';

export default function BookList() {
  const [books, setBooks] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [summaryId, setSummaryId] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');

  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = React.useState(false);
  const [bookToDelete, setBookToDelete] = React.useState(null);

  const [showBookFormDialog, setShowBookFormDialog] = React.useState(false);
  const [bookFormContent, setBookFormContent] = React.useState({
    _id: '',
    title: '',
    author: '',
    publicationYear: 2024,
    summary: '',
  });
  const [bookFormAction, setBookFormAction] = React.useState('add');

  function handleDialogClose() {
    setShowDeleteConfirmDialog(false);
    setShowBookFormDialog(false);
  }

  function handleAdd() {
    setBookFormContent({
      _id: '',
      title: '',
      author: '',
      publicationYear: 2024,
      summary: '',
    });
    setBookFormAction('add');
    setShowBookFormDialog(true);
  }

  const handleEdit = (book) => {
    setBookFormContent(book);
    setBookFormAction('edit');
    setShowBookFormDialog(true);
  };

  const handleDelete = (book) => {
    setBookToDelete(book);
    setShowDeleteConfirmDialog(true);
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
    resetBookList();
  };

  function handleSearch(event) {
    let searchText = event.target.value;
    setSearchText(searchText);
    setPage(1);
    fetchBooks(0, searchText);
  }

  const fetchBooks = React.useCallback((offset, searchText = '') => {
    fetchBooksAPI(offset, 10, searchText)
      .then(function (response) {
        // handle success
        if (response.status === 200) {
          setBooks(response.data.results);

          const pageCount = Math.ceil(response.data.totalCount / 10);
          if (pageCount < page) {
            setPage(pageCount);
            setCount(pageCount);
            if (pageCount) {
              fetchBooks((pageCount - 1) * 10, searchText);
            }
          }
          else {
            setCount(pageCount);
          }
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
  }, [page]);

  const resetBookList = React.useCallback((goToFirstPage = false) => {
    if (goToFirstPage) {
      setPage(1);
      fetchBooks(0, searchText);
    }
    else if (page) {
      fetchBooks((page - 1) * 10, searchText);
    }
  }, [page, searchText, fetchBooks]);

  React.useEffect(() => {
    resetBookList();
    return () => { };
  }, [resetBookList])

  return (
    <Container maxWidth="md">
      <Box sx={{ height: '100vh' }}>
        <TextField fullWidth value={searchText} placeholder='Search on title, author or summary' onChange={handleSearch} id="fullWidth" />
        <Pagination count={count} page={page} onChange={onPageChange} />
        <Chip
          icon={<AddCircleOutlineIcon />}
          label='Add New Book'
          variant="outlined"
          onClick={handleAdd}
        />
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
              <BookSummary summary={book.summary} />
            </Collapse>
          </ React.Fragment>))}
        </List>
      </ Box>

      <BookDeleteConfirmDialog
        open={showDeleteConfirmDialog}
        bookToDelete={bookToDelete}
        handleDialogClose={handleDialogClose}
        resetBookList={resetBookList}
      />

      <BookFormDialog
        action={bookFormAction}
        open={showBookFormDialog}
        bookFormContent={bookFormContent}
        handleDialogClose={handleDialogClose}
        resetBookList={resetBookList}
      />
    </Container>
  );
}
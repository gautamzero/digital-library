import axios from 'axios';

// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_SERVER_DOMAIN || '';

export function fetchBooksAPI (offset = 0, limit = 10, searchText = '') {
    let url = `${BASE_URL}/api/books?limit=${limit}&offset=${offset}`;
    if (searchText.length > 0) {
        url = `${url}&searchText=${searchText}`;
    }
    return axios.get(url);
}

export function addBookAPI (body) {
    let url = `${BASE_URL}/api/books`;
    return axios.post(url, body);
}

export function updateBookAPI (id, body) {
    let url = `${BASE_URL}/api/books/${id}`;
    return axios.put(url, body);
}

export function deleteBookAPI (id) {
    let url = `${BASE_URL}/api/books/${id}`;
    return axios.delete(url);
}
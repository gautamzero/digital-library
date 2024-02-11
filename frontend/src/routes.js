import React from "react";
import BookList from "./components/book/book-list";
import ErrorPage from "./components/common/error-page";

const routes = [
    {
        path: "/",
        element: <BookList />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/add-book",
        element: <div>Add book!</div>,
    },
];

export default routes; 
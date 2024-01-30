import Joi from 'joi';

export default {
    addBook: {
        body: Joi
            .object({
                title: Joi.string().required(),
                author: Joi.string().required(),
                summary: Joi.string().default("lorem ipsum dolor sit"),
                publicationYear: Joi.number().min(0).max(3000).default(2024),
            })
            .options({ abortEarly: false }),
    },
    getBookById: {
        params: Joi
            .object({
                id: Joi.string().required(),
            })
            .options({ abortEarly: false }),
    },
    updateBook: {
        params: Joi
            .object({
                id: Joi.string().required(),
            })
            .options({ abortEarly: false }),
        body: Joi
            .object({
                title: Joi.string(),
                author: Joi.string(),
                summary: Joi.string().default("lorem ipsum dolor sit"),
                publicationYear: Joi.number().min(0).max(3000).default(2024),
            })
            .options({ abortEarly: false }),
    },
    deleteBook: {
        params: Joi
            .object({
                id: Joi.string().required(),
            })
            .options({ abortEarly: false }),
    },
};

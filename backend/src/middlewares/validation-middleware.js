/**
 * Validate param, query or payload schema
 * @param {Object} schema - The schema by which request param, query or payload will be verified
 * @param {Object} req - Object represents HTTP request
 * @param {Object} res - Object represents HTTP response
 * @param {Function} next - Represents the next middleware function
 * @returns {Function} - Returns the next function or rejects with error
 */
const validateSchema = (schema) => (req, res, next) => {
    if (schema) {
        // Check if the schema is for params
        if (schema.params) {
            const { error } = schema.params.validate(req.params);
            if (error) {
                // Construct error message if not valid
                let messages = error.details.map((i) => i.message);
                messages = [...new Set(messages)];
                const message = messages.join(',');
                console.log(`-----${message}-----`);
                return res
                    .status(422)
                    .json({
                        error: message,
                    });
            }
        }
        // Check if the schema is for query
        if (schema.query) {
            const { error, value } = schema.query.validate(req.query);
            req.query = value;
            if (error) {
                // Construct error message if not valid
                let messages = error.details.map((i) => i.message);
                messages = [...new Set(messages)];
                const message = messages.join(',');
                console.log(`-----${message}-----`);
                return res
                    .status(422)
                    .json({
                        error: message,
                    });
            }
        }
        // Check if the schema is for payload
        if (schema.body) {
            const { error, value } = schema.body.validate(req.body);
            req.body = value;
            if (error) {
                // Construct error message if not valid
                let messages = error.details.map((i) => i.message);
                messages = [...new Set(messages)];
                const message = messages.join(',');
                console.log(`-----${message}-----`);
                return res
                    .status(422)
                    .json({
                        message,
                    });
            }
        }
    }
    return next();
};

export default validateSchema;

export async function handleErrorResponse (error, res) {
    let errorResponse = error;

    if (error instanceof Error) {
      console.error(error.stack || error);
      errorResponse = {
        status: 500,
        message: 'An Internal Server Error Occurred',
      };
    }
  
    errorResponse.message = errorResponse.message || 'An Internal Server Error Occurred';
    const { status, ...responseData } = errorResponse;
  
    // return response with proper status and message
    return res
      .status(status || 500)
      .send(responseData);
  };

  export function throwCustomError (status, message) {
    let error = {
        status,
        message,
    };
    throw error;
  }
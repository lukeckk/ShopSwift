// setting up to handle not found error
const notFound = (req, res, next) => {
  const error = new Error(`Not Found = ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  //  check if the status code is 200
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // check for mongoose bad ObjectId
  if(err.name === 'CastError' && err.kind === 'ObjectId') {
    message = `Resource not found`;
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? 'Production mode' : err.stack
  });

};

export { notFound, errorHandler };


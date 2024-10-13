
// this is used to handle error to avoid using many try-catch blocks
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);

}

export default asyncHandler;
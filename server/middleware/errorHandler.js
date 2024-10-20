export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`Error: ${message}, Status Code: ${statusCode}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};

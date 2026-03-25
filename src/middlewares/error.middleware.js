export const errorHandler = (err, req, res, next) => {
  console.error("Error caught by middleware:");
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = err.message || "internal_server_error";

  return res.status(status).json({
    error: message
  });
};
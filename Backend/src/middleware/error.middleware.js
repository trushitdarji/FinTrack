function errorHandler(err, req, res, next) {
  console.log(err);

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid ID format",
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
}

export default errorHandler;
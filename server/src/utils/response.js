export const fail = (req, res, error) => {
  res.status(error.status || 400);
  res.send({
    data: {},
    message: error.message,
  });
};

export const success = (req, res, result) => {
  res.status(200);
  res.send({
    data: result,
    message: result?.message || "Successfully initiated",
  });
};

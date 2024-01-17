export const homeController = (req, res) => {
  res.status(200).send({
    success: "true",
    message: `Welcome Home!`,
  });
};

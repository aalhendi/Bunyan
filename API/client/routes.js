/* Imports */
const express = require("express");
const passport = require("passport");

/* Route Imports */
const {
  fetchTasks,
  fetchClient,
  fetchClients,
  updateProfile,
  findClient,
} = require("./controllers");

const router = express.Router();

/* Params Middleware */
router.param("clientId", async (req, res, next, clientId) => {
  const client = await fetchClient(clientId, next);
  if (client) {
    req.client = client;
    next();
  } else {
    const error = new Error("Client Object Not Found.");
    error.status = 404;
    next(error);
  }
});

/* Fetch Task*/
router.get("/tasks", fetchTasks);

/* Fetch Client Objects */
router.get("/", fetchClients);

/* Fetch Client Objects */
router.get("/:clientId", findClient);

/* Update Client Profile */
router.put(
  "/:clientId",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);

module.exports = router;

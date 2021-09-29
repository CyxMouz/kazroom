const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/api/test/all", users.allAccess);
    app.get(
      "/api/test/user",
      [authJwt.verifyToken],
      users.userBoard
    );
  
    app.get(
      "/api/test/mod",
      [authJwt.verifyToken, authJwt.isModerator],
      users.moderatorBoard
    );
  
    app.get(
      "/api/test/admin",
      [authJwt.verifyToken, authJwt.isAdmin],
      users.adminBoard
    );

    // Create a new user
    router.post("/", users.create);
  
    // Retrieve all user
    router.get("/", users.findAll);
  
    // Retrieve all confirmed user
    router.get("/confirmed", users.findAllConfirmed);
  
    // Retrieve a single user with id
    router.get("/:id", users.findOne);
  
    // Update a user with id
    router.put("/:id", users.update);
  
    // Delete user with id
    router.delete("/:id", users.delete);
  
    // Delete all user 
    router.delete("/", users.deleteAll);
  
    app.use("/api/users", router);
  };
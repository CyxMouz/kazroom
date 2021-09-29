module.exports = app => {
    const publications = require("../controllers/publication.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", publications.create);
  
    // Retrieve all Tutorials
    router.get("/", publications.findAll);
  
    // Retrieve all published Tutorials
    //router.get("/published", publications.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", publications.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", publications.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", publications.delete);
  
    // Create a new Tutorial
    router.delete("/", publications.deleteAll);
  
    app.use("/api/publications", router);
  
  }
  
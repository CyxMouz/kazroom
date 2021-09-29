module.exports = app => {
    const restrictions = require("../controllers/restriction.controller.js");
  
    var router = require("express").Router();
  
    // Create a new restriction
    router.post("/", restrictions.create);
  

   // Retrieve all restrictions
    router.get("/", restrictions.findAll);
 
 
   // Retrieve a single restrictions with id
   router.get("/:id", restrictions.findOne);
 
   // Update a restrictions with id
   router.put("/:id", restrictions.update);
 
   // Delete a restrictions with id
   router.delete("/:id", restrictions.delete);
 
   // Create a new restrictions
   router.delete("/", restrictions.deleteAll);
  
    app.use("/api/restrictions", router);
  
  }
  
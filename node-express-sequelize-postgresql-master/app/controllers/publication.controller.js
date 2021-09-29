const db = require("../models");
const Publication = db.publications;
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Publication
exports.create = (req, res) => {
  // Validate request{
    
  if (!req.body.text) {
    
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Publication
  const publication = {
    text: req.body.text,
    userId: req.body.userId,
    name : req.body.name,
  };

  // Save Publication in the database
  Publication.create(publication)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the publication."
      });
    });
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const text = req.query.text;
  var condition = text ? { text: { [Op.iLike]: `%${text}%` } } : null;

  Publication.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving publication."
      });
    });
};

// Find a single Publication with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving publication with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Publication.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Publication was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update publication with id=${id}. Maybe Publication was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Publication with id=" + id
      });
    });
};

// Delete a Publication with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Publication.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Publication was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Publication with id=${id}. Maybe Publication was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Publication with id=" + id
      });
    });
};

// Delete all Publications from the database.
exports.deleteAll = (req, res) => {
  Publication.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Publications were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all publications."
      });
    });
};

// find all published Publication
// exports.findAllPublished = (req, res) => {
//   Publication.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Publications."
//       });
//     });
// };

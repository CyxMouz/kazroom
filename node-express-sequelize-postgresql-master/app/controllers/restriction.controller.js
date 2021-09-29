const db = require("../models");
const Op = db.Sequelize.Op;
const Restriction = db.restrictions;

exports.create = (req,res) => {

  if (!req.body.permission) {
    res.status(400).send({
      message: "Permission field is empty",
    });
    return;
  }
    const restriction = {
        
        permission : req.body.permission
        // restriction on Restriction  
      };

      Restriction.create(restriction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the restriction."
      });
    });

    
    
};

exports.findAll = (req, res) => {
  const title = req.query.permission;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Restriction.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restrictions."
      });
    });
};


// Retrieve all Restrictions from the database.
exports.findAll = (req, res) => {
  const permission = req.query.permission;
  var condition = permission ? { permission: { [Op.iLike]: `%${permission}%` } } : null;

  Restriction.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving persmission."
      });
    });
};

// Find a single Userwith an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Restriction.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving permission with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Restriction.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "permission was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update permission with id=${id}. Maybe permission was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Restriction with id=" + id
      });
    });
};

// Delete a Restriction with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Restriction.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Restriction was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Restriction with id=${id}. Maybe Restriction was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Restriction with id=" + id
      });
    });
};

// Delete all Restrictions from the database.
exports.deleteAll = (req, res) => {
  Restriction.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Restriction were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Restrictions."
      });
    });
};

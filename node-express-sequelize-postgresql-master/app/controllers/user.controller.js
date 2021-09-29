const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const Comment = db.comments;

const Publication = db.publications;


// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name : req.body.last_name,
    email     : req.body.email,
    password  : req.body.password,
    confirmed : req.body.confirmed ? req.body.confirmed : false,
    birth     : req.body.birth,
    tel       : req.body.tel,
    photo     : req.body.photo,
    
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};

// Find a single Userwith an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// find all confirmed User
exports.findAllConfirmed = (req, res) => {
  User.findAll({ where: { confirmed: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};


//Create and Save new Comments

exports.createComment = (userId, comment) => {
  return Comment.create({
    name: comment.name,
    text: comment.text,
    userId: userId,
  })
    .then((comment) => {
      console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while creating comment: ", err);
    });
};

//Get the comments for a given user

exports.findUserById = (userId) => {
  return User.findByPk(userId, { include: ["comments"] })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.log(">> Error while finding user: ", err);
    });
};

//Get the comments for a given comment id

exports.findCommentById = (id) => {
  return Comment.findByPk(id, { include: ["user"] })
    .then((comment) => {
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
    });
};


//Get all Users include comments

exports.findAllComment = () => {
  return User.findAll({
    include: ["comments"],
  }).then((users) => {
    return users;
  });
};



//Create and Save new publication

exports.createPublication = (userId, publication) => {
  return Publication.create({
    name: publication.name,
    text: publication.text,
    userId: userId,
  })
    .then((publication) => {
      console.log(">> Created publication: " + JSON.stringify(publication, null, 4));
      return publication;
    })
    .catch((err) => {
      console.log(">> Error while creating publication: ", err);
    });
};

//Get the publication for a given user

exports.findUserById = (userId) => {
  return User.findByPk(userId, { include: ["publications"] })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.log(">> Error while finding user: ", err);
    });
};

//Get the publication for a given publication id

exports.findPublicationById = (id) => {
  return Publication.findByPk(id, { include: ["user"] })
    .then((publication) => {
      return publication;
    })
    .catch((err) => {
      console.log(">> Error while finding publication: ", err);
    });
};


//Get all Users include publications

exports.findAllPublication = () => {
  return User.findAll({
    include: ["publications"],
  }).then((users) => {
    return users;
  });
};

//access controller 

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};




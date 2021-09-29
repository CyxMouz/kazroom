const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.publications = require("./publication.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.restrictions = require("./restriction.model.js")(sequelize, Sequelize);

db.users.hasMany(db.publications, { as: "publications" });
db.publications.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.publications.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.publications, {
  foreignKey: "publicationId",
  as: "publication",
});

db.role.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.users.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.restrictions.belongsToMany(db.users, {
  through: "user_restrictions",
  foreignKey: "restrictionId",
  otherKey: "userId"
});
db.users.belongsToMany(db.restrictions, {
  through: "user_restrictions",
  foreignKey: "userId",
  otherKey: "restrictionsId"
});

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
      Name: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
    });
  
    return Comment;
  };
  
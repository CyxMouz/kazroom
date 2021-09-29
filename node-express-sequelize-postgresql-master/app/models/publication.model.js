module.exports = (sequelize, Sequelize) => {
    const Publication = sequelize.define("publications", {
      name: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
    });
  
    return Publication;
  };
  
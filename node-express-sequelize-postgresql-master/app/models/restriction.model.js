module.exports = (sequelize, Sequelize) => {

    const Restriction = sequelize.define(" restrictions", {
        
      
        permission : {
            type: Sequelize.STRING
        },
      
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

    });

    return Restriction;
};


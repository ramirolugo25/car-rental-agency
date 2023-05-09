const {Sequelize, Model, DataTypes} = require('sequelize');

module.exports = class CarModel extends Model {

    static setup(sequelizeInstance){
        CarModel.init(
            {
                id:{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true,
                },
                brand:{
                    type: DataTypes.STRING,
                },
                model: {
                    type: DataTypes.STRING,
                },
                year: {
                    type: DataTypes.STRING,
                },
                crestUrl: {
                    type: DataTypes.STRING,
                },
                kilometres: {
                    type: DataTypes.STRING,
                },
                color: {
                    type: DataTypes.STRING,
                },
                airConditioning: {
                    type: DataTypes.BOOLEAN,
                },
                passengers: {
                    type: DataTypes.INTEGER,
                },
                gearbox: {
                    type: DataTypes.STRING,
                },
                lastUpdated: {
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.NOW,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
             sequelize: sequelizeInstance,
             modelName: 'Car',
             timestamps: false,
            }
        );
        return CarModel;
    }
};

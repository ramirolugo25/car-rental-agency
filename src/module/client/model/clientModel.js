const {Sequelize, Model, DataTypes} = require('sequelize');

module.exports = class ClientModel extends Model {

    static setup(sequelizeInstance){
        ClientModel.init(
            {
                id:{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true,
                },
                name:{
                    type: DataTypes.STRING,
                },
                lastName:{
                    type: DataTypes.STRING,
                },
                documentType:{
                    type: DataTypes.STRING,
                },
                documentNumber:{
                    type: DataTypes.STRING,
                },
                nationality: {
                    type: DataTypes.STRING,
                },
                address:{
                    type: DataTypes.STRING,
                },
                phoneNumber: {
                    type: DataTypes.STRING,
                },
                email: {
                    type: DataTypes.STRING,
                },
                birthdate :{
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize: sequelizeInstance,
                modelName: 'Client',
                timestamps: false,
            }
        );
        return ClientModel;
    }
}


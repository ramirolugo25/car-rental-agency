const ClientController = require("./controller/clientController");
const ClientService = require("./service/clientService");
const ClientRepository = require("./repository/sqlite/clientRepository");
const ClientModel = require("./model/clientModel");

/**
 * 
 * @param {import('express').Application} app 
 * @param {import('rsdi').DIContainer} container 
 */
function init(app, container){
    /**
     * @type {ClientController} controller;
     */

    const controller = container.get('ClientController');
    controller.configureRoutes(app);
}

module.exports = {
    init,
    ClientController,
    ClientService,
    ClientRepository,
    ClientModel,
};
const CarController = require('./controller/carController');
const CarService = require('./service/carService');
const CarRepository = require('./repository/sqlite/carRepository');
const CarModel = require('./model/carModel');

/**
 * 
 * @param {import('express').Application} app 
 * @param {import('rsdi').DIContainer} container 
 */
function init (app, container){
    /**
     * @type {CarController} controller;
     */
    
    const controller = container.get('CarController');
    controller.configureRoutes(app);
}

module.exports = {
    init,
    CarController,
    CarService,
    CarRepository,
    CarModel,
};
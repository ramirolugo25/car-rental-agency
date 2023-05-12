const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const {default: DIContainer, object, use, factory, func} = require('rsdi');
const { Sequelize } = require('sequelize');
const multer = require('multer');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const {CarController, CarService, CarRepository, CarModel} = require('../module/car/module');
const {ClientController, ClientService, ClientRepository, ClientModel} = require('../module/client/module');


function configureMainSequelizeDatabase() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_PATH,
    });
    return sequelize;
}

function configureSessionSequelizeDatabase() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.SESSION_DB_PATH,
    });
    return sequelize;
}

function configureCarModel(container){
    CarModel.setup(container.get('Sequelize'));
    return CarModel;
}

function configureClientModel(container){
    return ClientModel.setup(container.get('Sequelize'));
}

function configureSession(container){
    const ONE_WEEK_IN_SECONDS = 604800000;

    const sequelize = container.get('SessionSequelize');
    const sessionOptions = {
        store: new SequelizeStore({db: sequelize}),
        secret: crypto.randomBytes(64).toString('hex'),
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: ONE_WEEK_IN_SECONDS},
    };
    return session(sessionOptions);
}

function configureMulter(){
    const storage = multer.diskStorage({
        destination(req, file, cb){
            cb(null, process.env.CRESTS_UPLOAD_DIR);
        },
        filename(req, file, cb){
            cb(null, Date.now() + path.extname(file.originalname))
        },
    });

    return multer({storage});
}


/**
 * 
 * @param {DIContainer} container 
 */
function addCommonDefinitions(container){
    container.add({
        fs,
        Sequelize: factory(configureMainSequelizeDatabase),
        SessionSequelize: factory(configureSessionSequelizeDatabase),
        Session: factory(configureSession),
        Multer: factory(configureMulter),
    });
}

/**
 * 
 * @param {DIContainer} container 
 */
function addCarModuleDefinitions(container){
    container.add({
        CarController: object(CarController).construct(use('Multer'), use('CarService')),
        CarService: object(CarService).construct(use('CarRepository')),
        CarRepository: object(CarRepository).construct(use('fs'), use('CarModel')),
        CarModel: factory(configureCarModel),
    });
}

function addClientModuleDefinitions(container){
    container.add({
        ClientController: object(ClientController).construct(use('ClientService')),
        ClientService: object(ClientService).construct(use('ClientRepository')),
        ClientRepository: object(ClientRepository).construct(use('ClientModel')),
        ClientModel: factory(configureClientModel),
    });
}

module.exports = function configureDI(){
    const container = new DIContainer();
    addCommonDefinitions(container);
    addCarModuleDefinitions(container);
    addClientModuleDefinitions(container);
    return container;
}
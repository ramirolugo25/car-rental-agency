const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const {default: DIContainer, object, use, factory} = require('rsdi');
const multer = require('multer');
const Sqlite3Database = require('better-sqlite3');

const session = require('express-session');
const {CarController, CarService, CarRepository} = require('../module/car/module');

function configureMainDatabaseAdapter(){
    return new Sqlite3Database(process.env.DB_PATH,{
        verbose: console.log,
    });
}

function configureSession(){
    const ONE_WEEK_IN_SECONDS = 604800000;

    const sessionOptions = {
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
        MainDatabaseAdapter: factory(configureMainDatabaseAdapter),
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
        CarRepository: object(CarRepository).construct(use('fs'), use('MainDatabaseAdapter'))
    });
}

module.exports = function configureDI(){
    const container = new DIContainer();
    addCommonDefinitions(container);
    addCarModuleDefinitions(container);
    return container;
}
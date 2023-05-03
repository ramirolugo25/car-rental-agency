const Car = require("../entity/car");
const CardIdNotDefinedError = require("./error/carIdNotDefinedError");
const CarNotDefinedError = require("./error/carNotDefinedError");

module.exports = class Service {

    /**
     * 
     * @param {import('../repository/abstractCarRepository')} carRepository 
     */
    constructor(carRepository){
        this.carRepository = carRepository;
    }

    /**
     * 
     * @param {import('../entity/car')} car 
     */

    async save(car){
        if(car === undefined){
            throw new CarNotDefinedError();
        }
        return this.carRepository.save(car);
    }

    /**
     * 
     * @param {import('../entity/car')} car 
     */
    async saveUpdate(car){
        if(car === undefined){
            throw new CarNotDefinedError();
        }
        return this.carRepository.saveUpdate(car);
    }

    /**
     * 
     * @param {import('../entity/car')} car 
     */
    async delete(car){
        if (!(car instanceof Car)){
            throw new CarNotDefinedError();
        }

        return this.carRepository.delete(car);
    }

    /**
     * 
     * @param {Number} id 
     */
    async getById(id){
        if (id === undefined){
            throw new CardIdNotDefinedError();
        }

        return this.carRepository.getById(id);
    }

    async getAll(){
        return this.carRepository.getAll();
    }
}
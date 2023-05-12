const { fromModelToEntity } = require("../../mapper/carMapper");
const AbstractCarRepository = require("../abstractCarRepository");
const CarIdNotDefinedError = require("../error/carIdNotDefinedError");
const CarNotFoundError = require("../error/carNotFoundError");

module.exports = class CarRepository extends AbstractCarRepository {
    
    /**
     * 
     * @param {import('fs')} fileSystem 
     * @param {typeof import('../../model/carModel')} carModel 
     */
    constructor(fileSystem, carModel) {
        super();
        this.carModel = carModel;
        this.fileSystem = fileSystem;
    }

    /**
     * 
     * @param {import('../../entity/car')} car 
     * @returns {import('../../entity/car')}
     */
    async save(car) {
        const carModel = await this.carModel.create(car);
        return fromModelToEntity(carModel);
    }

    /**
     * 
     * @param {import('../../entity/car')} car 
     * @returns {import('../../entity/car')}
     */
    async saveUpdate(car) {
        //Delete the previous image from the filesystem if the image is update
        if (car.crestUrl) {
            const carModel = await this.carModel.findOne({where: {id: car.id}});
            this.fileSystem.unlinkSync(carModel.crestUrl);
        }
        
        const carModel = await this.carModel.build(car, {isNewRecord: false}).save();    
    
        return fromModelToEntity(carModel);
    }

    /**
     * 
     * @param {import('../../entity/car')} car 
     * @returns {Boolean}
     */
    async delete(car) {
        if (!car || !car.id) {
            throw new CarIdNotDefinedError('the car id is not defined');
        }
      
        if(car.crestUrl){
            this.fileSystem.unlinkSync(car.crestUrl);
        }

        return Boolean(await this.carModel.destroy({where: {id: car.id}})); 
    }

    /**
     * 
     * @param {Number} id 
     * @returns {import('../../entity/car')}
     */
    async getById(id) {
        const carModel = await this.carModel.findOne({where: {id}});

        if (!carModel) {
            throw new CarNotFoundError(`the car with ID ${id} was not found`);
        }

        return fromModelToEntity(carModel);
    }

    /**
     * 
     * @returns {Array<import('../../entity/car')>}
     */

    async getAll() {
        const cars = await this.carModel.findAll();
        return cars.map(fromModelToEntity);
    }
}
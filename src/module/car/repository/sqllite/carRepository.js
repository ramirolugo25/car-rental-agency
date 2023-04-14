const { fromDbToEntity } = require("../../mapper/carMapper");
const AbstractCarRepository = require("../abstractCarRepository");
const CarIdNotDefinedError = require("../error/carIdNotDefinedError");
const CarNotFoundError = require("../error/carNotFoundError");

module.exports = class CarRepository extends AbstractCarRepository {
    /**
     * 
     * @param {import('better-sqlite3').Database} databaseAdapter 
     */

    constructor(databaseAdapter){
        super();
        this.databaseAdapter = databaseAdapter;
    }

    /**
     * 
     * @param {import('../../entity/car')} car 
     * @returns {import('../../entity/car')}
     */
    save(car){
        let id;
        const isUpdate = car.id;

        if(isUpdate){
            id = car.id;
            const statement = this.databaseAdapter.prepare(`
                UPDATE cars SET
                    brand = ?,
                    model = ?,
                    year = ?,
                    kilometres = ?,
                    color = ?,
                    air_conditioning = ?,
                    passengers = ?,
                    gearbox = ?
                WHERE id = ?
            `);

            const params = [
                car.brand,
                car.model,
                car.year,
                car.kilometres,
                car.color,
                car.airConditioning,
                car.passengers,
                car.gearbox,
                car.id,
            ];

            statement.run(params);
        }else{
            const statement = this.databaseAdapter.prepare(`
                INSERT INTO cars(
                    brand,
                    model,
                    year,
                    kilometres,
                    color,
                    air_conditioning,
                    passengers,
                    gearbox
                ) VALUES(?,?,?,?,?,?,?,?)
            `);

            const params = [
                car.brand,
                car.model,
                car.year,
                car.kilometres,
                car.color,
                car.airConditioning,
                car.passengers,
                car.gearbox,
            ];

            const result = statement.run(params);
            id = result.lastInsertRowid;
        }

        return this.getById(id);
    }

    /**
     * 
     * @param {import('../../entity/car')} car 
     * @returns {Boolean}
     */
    delete(car){
        if(!car || !car.id){
            throw new CarIdNotDefinedError('the car id is not defined');
        }

        this.databaseAdapter.prepare('DELETE FROM cars WHERE id = ?').run(car.id);

        return true;
    }

    /**
     * 
     * @param {Number} id 
     * @returns {import('../../entity/car')}
     */
    getById(id){
        const car = this.databaseAdapter.prepare(`
            SELECT 
                id,
                brand,
                model,
                year,
                kilometres,
                color,
                air_conditioning,
                passengers,
                gearbox
            FROM cars WHERE id = ?
        `).get(id);

        if(car === undefined){
            throw new CarNotFoundError(`the car with ID ${id} was not found`);
        }

        return fromDbToEntity(car);

    }

    /**
     * 
     * @returns {Array<import('../../entity/car')>}
     */

    getAll(){
        const cars = this.databaseAdapter.prepare(
            `SELECT
                id,
                brand,
                model,
                year,
                kilometres,
                color,
                air_conditioning,
                passengers,
                gearbox
            FROM cars
            `
        ).all();

        return cars.map((carData) => fromDbToEntity(carData));
    }
}
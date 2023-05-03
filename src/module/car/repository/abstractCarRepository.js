const AbstractCarRepositoryError = require("./error/abstractCarRepositoryError");
const MethodNotImplementedError = require("./error/methodNotImplementedError");

module.exports = class AbstractCarRepository {
    constructor() {
        if (new.target === AbstractCarRepository){
            throw new AbstractCarRepositoryError(
                'Cannot instantiate abstract cars repository.'
            );
        }
    }

    /**
     * @param {import('../entity/car')} car
     * @returns {import('../entity/car')} 
     */
    async save(car){
        throw new MethodNotImplementedError();
    }

    /**
     * @param {Number} id 
     */

    async delete(id){
        throw new MethodNotImplementedError();
    }

    /**
     * 
     * @param {Number} id
     * @returns {import('../entity/car')} 
     */
    async getById(id){
        throw new MethodNotImplementedError();
    }

    /**
     * @returns {Array<import('../entity/car')>}
     */
    async getAll(){
        throw new MethodNotImplementedError();
    }
}
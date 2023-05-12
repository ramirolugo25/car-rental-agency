const AbstractClientRepositoryError = require("./error/abstractClientRepositoryError");
const MethodNotImplementedError = require("./error/methodNotImplementedError");

module.exports = class AbstractClientRepository {
    constructor(){
        if (new.target === AbstractClientRepository){
            throw new AbstractClientRepositoryError(
                'Cannot instantiate abstract clients repository'
            );
        }
    }

    /**
     * @param {import('../entity/client')} client 
     * @returns {import('../entity/client')}
     */
    async save(client){
        throw new MethodNotImplementedError();
    }

    /**
     * @param {import('../entity/client')} client 
     * @returns {import('../entity/client')}
     */
    async saveUpdate(client){
        throw new MethodNotImplementedError();
    }

    /**
     * 
     * @param {import('../entity/client')} client 
     * @returns {Boolean}
     */
    async delete(client){
        throw new MethodNotImplementedError();
    }

    /**
     * @param {Number} id
     * @returns {import('../entity/client')} 
     */
    async getById(id){
        throw new MethodNotImplementedError();
    }

    /**
     * @returns {Array<import('../entity/client')>}
     */
    async getAll(){
        throw new MethodNotImplementedError();
    }
}
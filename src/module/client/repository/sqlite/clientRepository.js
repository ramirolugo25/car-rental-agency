const {fromModelToEntity} = require("../../mapper/clientMapper");
const AbstractClientRepository = require("../abstractClientRepository");
const ClientIdNotDefinedError = require("../error/clientIdNotDefinedError");
const ClientNotFoundError = require("../error/clientNotFoundError");

module.exports = class ClientRepository extends AbstractClientRepository {

    constructor(clientModel){
        super();
        this.clientModel = clientModel;
    }

    /**
     * 
     * @param {import('../../entity/client')} client 
     * @returns {import('../../entity/client')}
     */
    async save(client){
        const clientModel = await this.clientModel.create(client);
        return fromModelToEntity(clientModel);
    }

    /**
     * 
     * @param {import('../../entity/client')} client 
     * @returns {import('../../entity/client')}
     */
    async saveUpdate(client){
        const clientModel = await this.clientModel.build(client,{isNewRecord: false}).save();
        return fromModelToEntity(clientModel);
    }

    /**
     * 
     * @param {import('../entity/client')} client 
     * @returns {Boolean}
     */
    async delete(client){
        if(!client || !client.id){
            throw new ClientIdNotDefinedError('the client id is not defined');
        }
        
        return Boolean(await this.clientModel.destroy({where: {id: client.id}}));
    }

    /**
     * @param {Number} id
     * @returns {import('../entity/client')} 
     */
    async getById(id){
        const clientModel = await this.clientModel.findOne({ where: { id } });

        if(!clientModel){
            throw new ClientNotFoundError(`the client with ID ${id} was not found`);
        }

        return fromModelToEntity(clientModel);
    }

    /**
     * @returns {Array<import('../../entity/client')>}
     */
    async getAll(){
        const clients = await this.clientModel.findAll();
        return clients.map(fromModelToEntity);
    }

}
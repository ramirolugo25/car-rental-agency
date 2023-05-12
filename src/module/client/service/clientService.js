const Client = require("../entity/client");
const ClientNotDefinedError = require("./error/clientNotDefinedError");
const ClientIdNotDefinedError = require("./error/clientIdNotDefinedError");

module.exports = class Service {

    /**
     * 
     * @param {import('../repository/abstractClientRepository')} clientRepository 
     */
    constructor(clientRepository){
        this.clientRepository = clientRepository;
    }

    /**
     * 
     * @param {import('../entity/client')} client 
     */
    async save(client){
        if(client === undefined){
            throw new ClientNotDefinedError();
        }
        const dateString = client.birthdate;
        const date = new Date(dateString);
        const year = date.getFullYear();   
        const monthDate = date.getMonth() + 1;
        const dayDate = date.getDate() + 1;
        const month = monthDate > 9 ? monthDate : `0${monthDate}`;
        const day = dayDate > 9 ? dayDate : `0${dayDate}`;
        client.setBirthdate = `${year}-${month}-${day}`;
        return this.clientRepository.save(client);
    }

    /**
     * 
     * @param {import('../entity/client')} client 
     */
    async saveUpdate(client){
        if(client === undefined){
            throw new ClientNotDefinedError();
        }
        return this.clientRepository.saveUpdate(client);
    }

    /**
     * 
     * @param {import('../entity/client')} client 
     */
    async delete(client){
        if(!(client instanceof Client)){
            throw new ClientNotDefinedError();
        }

        return this.clientRepository.delete(client);
    }

    /**
     * 
     * @param {Number} id 
     */
    async getById(id){
        if(id === undefined){
            throw new ClientIdNotDefinedError();
        }

        return this.clientRepository.getById(id);
    }

    async getAll(){
        return this.clientRepository.getAll();
    }
}
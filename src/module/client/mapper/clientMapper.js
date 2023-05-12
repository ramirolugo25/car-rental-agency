const Client = require("../entity/client");

function fromDataToEntity({
    id,
    name,
    'last-name' : lastName,
    'document-type': documentType,
    'document-number': documentNumber,
    nationality,
    address,
    'phone-number': phoneNumber,
    email,
    birthdate,
}){
    return new Client({
        id,
        name,
        lastName,
        documentType,
        documentNumber,
        nationality,
        address,
        phoneNumber,
        email,
        birthdate,
    });
}


/**
 * 
 * @param {import('../model/clientModel')} model 
 * @returns {import('../entity/client')}
 */
function fromModelToEntity(model){
    return new Client(model.toJSON());
}

module.exports = {
    fromModelToEntity,
    fromDataToEntity,
}
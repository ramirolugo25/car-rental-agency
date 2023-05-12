module.exports = class Client {
    constructor({
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
    }){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.nationality = nationality;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.birthdate = birthdate;
    }

    set setBirthdate(date){
        this.birthdate = date;
    }
}





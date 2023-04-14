module.exports = class Car {
    constructor({
        id,
        brand,
        model,
        year,
        kilometres,
        color,
        airConditioning,
        passengers,
        gearbox,
    }) {
       this.id = id;
       this.brand = brand;
       this.model = model;
       this.year = year;
       this.kilometres = kilometres;
       this.color = color;
       this.airConditioning = airConditioning;
       this.passengers = passengers;
       this.gearbox = gearbox; 
    }
}
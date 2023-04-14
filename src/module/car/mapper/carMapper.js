const Car = require("../entity/car");

/**
 * 
 * @param {Object} formData
 * @returns Car
 */
function fromDbToEntity({
    id,
    brand,
    model,
    year,
    kilometres,
    color,
    air_conditioning: airConditioning,
    passengers,
    gearbox,
}){
  return new Car({
    id,
    brand,
    model,
    year,
    kilometres,
    color,
    airConditioning,
    passengers,
    gearbox,
  });  
}

module.exports = {
    fromDbToEntity,
}
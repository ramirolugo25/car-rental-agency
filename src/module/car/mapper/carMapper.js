const Car = require("../entity/car");

function fromDataToEntity({
  id,
  brand,
  model,
  year,
  'crest-url': crestUrl,
  kilometres,
  color,
  'air-conditioning': airConditioning,
  passengers,
  gearbox,
}){
  return new Car({
    id,
    brand,
    model,
    year,
    crestUrl,
    kilometres,
    color,
    airConditioning,
    passengers,
    gearbox,
  });
}

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
    crest_url: crestUrl,
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
    crestUrl,
    kilometres,
    color,
    airConditioning,
    passengers,
    gearbox,
  });  
}

module.exports = {
    fromDbToEntity,
    fromDataToEntity,
}
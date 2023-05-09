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
 * @param {import('../model/carModel')} model 
 * @returns {import('../entity/car')}
 */
function fromModelToEntity(model){
  return new Car(model.toJSON());
}

// /**
//  * 
//  * @param {Object} formData
//  * @returns Car
//  */
// function fromDbToEntity({
//     id,
//     brand,
//     model,
//     year,
//     crest_url: crestUrl,
//     kilometres,
//     color,
//     air_conditioning: airConditioning,
//     passengers,
//     gearbox,
// }){
//   return new Car({
//     id,
//     brand,
//     model,
//     year,
//     crestUrl,
//     kilometres,
//     color,
//     airConditioning,
//     passengers,
//     gearbox,
//   });  
// }

module.exports = {
    fromModelToEntity,
    fromDataToEntity,
}
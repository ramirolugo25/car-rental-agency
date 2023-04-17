const AbstractController = require("../../abstractController");
const { fromDataToEntity } = require("../mapper/carMapper");
const CarIdNotDefinedError = require("./error/carIdNotDefinedError");

module.exports = class CarController extends AbstractController {

    /**
     * 
     * @param {import('../service/carService')} carService 
     */
    constructor(uploadMiddleware ,carService){
        super();
        this.ROUTE_BASE = '/car';
        this.uploadMiddleware = uploadMiddleware;
        this.carService = carService;
    }

    configureRoutes(app){
        const ROUTE = this.ROUTE_BASE;

        app.get(`${ROUTE}/create`, this.create.bind(this));
        app.get(`${ROUTE}` , this.index.bind(this));
        app.get(`${ROTUE}/view/:id`, this.view.bind(this));
        app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
        app.post(`${ROUTE}/save`, this.uploadMiddleware.single('crest-url'), this.save.bind(this));
    }

    async index(req, res){
        const cars = this.carService.getAll();
        const {errors , messages} = req.session;
        res.render();
        req.session.errors = [];
        req.session.messages = [];
    }

    async create(req, res){
        res.render('');
    }

    async view(req, res){
        const {id} = req.params;
        if(!id){
            throw new CarIdNotDefinedError();
        }

        try {
            const car = await this.carService.getById(id);
            res.render();
        } catch (e) {
            req.session.errors = [e.message, e.stack];
            res.redirect();
        }
        
    }

    async delete(req, res){
        
        try {
            const {id} = req.params;
            const car = await this.carService.getById(id);
            await this.carService.delete(car);
            req.session.message = [`The ${car.brand} ${car.model} ${car.year} car with the id ${id} was removed`];   
        } catch (e) {
            req.session.errors = [e.message, e.stack];
        }
        res.redirect();
        
        

    }

    async save(req, res){
        try {
            const car = fromDataToEntity(req.body);
            if(req.file){
                const {path} = req.file;
                car.crestUrl = path;
            }
            const savedCar = await this.carService.save(car);
            if(car.id){
                req.session.messages = [`The car with id ${car.id} was updated successfully`];
            } else{
                req.session.message = [`The car with id ${savedCar.id} was created (${savedCar.brand} ${savedCar.model})`]
            }
            res.redirect('');
        } catch (error) {
            req.session.errors = [e.message, e.stack];
            res.redirect();
        }
    }



}
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

    /**
     * 
     * @param {import('express').Application} app 
     */
    configureRoutes(app){
        const ROUTE = this.ROUTE_BASE;

        app.get(`${ROUTE}/create`, this.create.bind(this));
        app.get(`${ROUTE}/update/:id`, this.update.bind(this));
        app.get(`${ROUTE}` , this.index.bind(this));
        app.get(`${ROUTE}/view/:id`, this.view.bind(this));
        app.get(`${ROUTE}/delete/:id`, this.deleteView.bind(this));
        app.post(`${ROUTE}/delete/:id`, this.delete.bind(this));
        app.post(`${ROUTE}/save`, this.uploadMiddleware.single('crest-url'), this.save.bind(this));
        app.post(`${ROUTE}/update/:id`, this.uploadMiddleware.single('crest-url'), this.saveUpdate.bind(this));
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async index(req, res){
        const cars = await this.carService.getAll();
        const {errors , messages} = req.session;
        res.render('car/view/index.html', {data: {cars}, messages, errors});
        req.session.errors = [];
        req.session.messages = [];
    }


    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async create(req, res){
        res.render('car/view/formCreate.html');
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async update(req,res){
        const {id} = req.params;
        if(!id){
            throw new CarIdNotDefinedError();
        }
        try {
            const car = await this.carService.getById(id);
            res.render('car/view/formUpdate.html', {data: {car} });
        } catch (e) {
            req.session.error = [e.message, e.stack];
            res.redirect('/car');
        }
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async deleteView(req, res){
        const {id} = req.params;
        if(!id){
            throw new CarIdNotDefinedError();
        }
        try {
            const car = await this.carService.getById(id);
            res.render('car/view/formDelete.html', {data: {car}});
        } catch (e) {
            req.session.error = [e.message, e.stack];
            res.redirect('/car');
        }
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async view(req, res){
        const {id} = req.params;
        if(!id){
            throw new CarIdNotDefinedError();
        }

        try {
            const car = await this.carService.getById(id);
            res.render('car/view/car.html', {data: {car}});
        } catch (e) {
            req.session.errors = [e.message, e.stack];
            res.redirect('/car');
        }
        
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async delete(req, res){
        
        try {
            const {id} = req.params;
            const car = await this.carService.getById(id);
            await this.carService.delete(car);
            req.session.message = [`The ${car.brand} ${car.model} ${car.year} car with the id ${id} was removed`];   
        } catch (e) {
            req.session.errors = [e.message, e.stack];
        }
        res.redirect('/car');
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async save(req, res){
        try {
            const car = fromDataToEntity(req.body);
            if(req.file){
                const {path} = req.file;
                car.crestUrl = path;
            }
            const savedCar = await this.carService.save(car);
            req.session.message = [`The car with id ${savedCar.id} was created (${savedCar.brand} ${savedCar.model})`]
            res.redirect('/car');
        } catch (e) {
            req.session.errors = [e.message, e.stack];
            res.redirect('/car');
        }
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async saveUpdate(req,res){
        try {
            const {id} = req.params;
            const car = fromDataToEntity(req.body);
            if(req.file){
                const {path} = req.file;
                car.crestUrl = path;
            }
            car.id = id;
            const updateCar = await this.carService.saveUpdate(car);
            req.session.messages = [`The car with id ${car.id} was updated successfully`];
            res.redirect('/car');
        } catch (e) {
            req.session.errors = [e.message, e.stack];
            res.redirect('/car');
        }
    }



}
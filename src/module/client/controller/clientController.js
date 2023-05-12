const AbstractController = require("../../abstractController");
const ClientIdNotDefinedError = require("./error/clientIdNotDefinedError");
const {fromDataToEntity} = require("../mapper/clientMapper");

module.exports = class ClientController extends AbstractController{

    /**
     * 
     * @param {import('../service/clientService')} clientService 
     */
    constructor(clientService){
        super();
        this.ROUTE_BASE = '/client';
        this.clientService = clientService;
    }

    configureRoutes(app){
        const ROUTE = this.ROUTE_BASE;

        app.get(`${ROUTE}/create`, this.create.bind(this));
        app.get(`${ROUTE}/update/:id`, this.update.bind(this));
        app.get(`${ROUTE}`, this.index.bind(this));
        app.get(`${ROUTE}/view/:id`, this.view.bind(this));
        app.get(`${ROUTE}/delete/:id`, this.deleteView.bind(this));
        app.post(`${ROUTE}/delete/:id`, this.delete.bind(this));
        app.post(`${ROUTE}/save`, this.save.bind(this));
        app.post(`${ROUTE}/update/:id`, this.saveUpdate.bind(this));
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async index(req, res){
        const clients = await this.clientService.getAll();
        const {errors, messages} = req.session;
        res.render('client/view/index.html', {data: {clients}, messages, errors});
        req.session.errors = [];
        req.session.messages = [];
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async create(req,res){
        res.render('client/view/formCreate.html');
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async update(req,res){
        const {id} = req.params;
        if(!id){
            throw new ClientIdNotDefinedError();
        }
        try {
            const client = await this.clientService.getById(id);
            res.render('client/view/formUpdate.html', {data: {client}});            
        } catch (e) {
            req.session.error = [e.message, e.stack];
            res.redirect('/client');
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
            throw new ClientIdNotDefinedError();
        }

        try {
            const client = await this.clientService.getById(id);
            res.render('client/view/client.html', {data: {client}});
        } catch (e) {
            req.session.errors = [e.message, e.stack];
            res.redirect('/client');
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
            throw new ClientIdNotDefinedError();
        }
        try {
            const client = await this.clientService.getById(id);
            res.render('client/view/formDelete.html', {data: {client}});
        } catch (e) {
            req.session.error = [e.message, e.stack];
            res.redirect('/client');
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
            const client = await this.clientService.getById(id);
            await this.clientService.delete(client);
            req.session.message = [`the client ${client.name} ${client.lastName} with the id ${client.id} has been deleted`];   
        } catch (e) {
            req.session.errors = [e.message, e.stack];
        }
        res.redirect('/client');
    }

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    async save(req,res){
        try {
            const client = fromDataToEntity(req.body);
            const savedClient = await this.clientService.save(client);
            req.session.message = [`The client ${savedClient.name} ${savedClient.lastName} with the id ${savedClient.id} has been created`];
            res.redirect('/client');
        } catch (e) {
            req.session.errors = [e.message, e.stack];
            res.redirect('/client');
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
            const client = fromDataToEntity(req.body);
            client.id = id;
            const updateClient = await this.clientService.saveUpdate(client);
            req.session.messages = [`the client with id ${client.id} has been updated successfully`];
            res.redirect('/client');
        } catch (e) {
            req.session.errors = [e.message, e.stack];
            res.redirect('/client');
        }
    }
}
const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.signup = '/api/auth';
        this.lesson = '/api/lesson'
        this.course = '/api/course'

        // Connect data base
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        const allowCrossDomain = function(req, res, next) {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        }
        app.configure(function() {
            app.use(allowCrossDomain);
            //some other code
        });   
        // const corsOptions = {
        //     origin: 'http://localhost:3000',
        //     optionsSuccessStatus: 200
        // }

        // // Cors
        // this.app.use(cors(corsOptions));
        
        // JSON
        this.app.use(express.json());
        // Public folder
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/user'))
        this.app.use(this.signup, require('../routes/auth'))
        this.app.use(this.lesson, require('../routes/lesson'))
        this.app.use(this.course, require('../routes/course'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server running in PORT ${this.port}`)
        });
    }

}

module.exports = Server;
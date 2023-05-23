const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const helmet = require('helmet')

//SWAGGER
const swaggerUi = require('swagger-ui-express');
const apiDocumentation = require('./apidocs.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation, {explorer: true}));
//END SWAGGER

app.use(helmet());

// app.use(basicAuth({
//     users: {'admin': 'supersecret'},
//     unauthorizedResponse: basicAuthResponse
// }));

// function basicAuthResponse(req) {
//     return req.auth
//         ? ('Credentials' + req.auth.user + ':' + req.auth.password + 'rejected')
//         : 'Unauthorized'
// }

//memanggil routes
const mahasiswaRouter = require('./routes/mahasiswa');
const jurusanRouter = require('./routes/jurusan');
const axiosRouter = require('./routes/axios');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/mahasiswa', mahasiswaRouter);
app.use('/jurusan', jurusanRouter);

app.use('/axios', axiosRouter);
app.use('/assets', express.static('assets'));

app.use((req, res, next) => {
    const error = new Error('tidak ditemukan');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;
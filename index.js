require('./config/db')

const app = require('express')();
const port = 3030 ;


const bodyParser= require('express').json;
const UserRouter= require('./api/User');

app.use(bodyParser());

app.use('/user', UserRouter)

app.listen(port,()=>{
    console.log('Server runnig on port 3030');
})
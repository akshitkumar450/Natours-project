const dotenv = require('dotenv')
// to reading the env file
//config should be efore app 
dotenv.config({ path: './config.env' })
// console.log(process.env);
const app = require('./app')


const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("server started");
});

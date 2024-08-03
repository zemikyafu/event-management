const express=require('express');
const app=express();
const cors =require('cors');
const authController= require('../controller/authController');
const corsOptions = {
  origin: '*',
};
//express-validator
//dotenv
app.use(express.json());
app.use(cors(corsOptions));

app.post('/api/users',authController.registerUser);
app.post('/api/login',authController.login);
app.get('/api/users',authController.getUsers);
app.get('/api/users/:id',authController.getUserById);
app.patch('/api/users/:id',authController.updateUser);

app.get('/', (req, res) => {
  console.log('url',req.url)
    res.send('Hello World!');
  });

const port = process.env.Event_PORT|| 8080;

app.listen(port,()=>{
    console.log("Start listening on Port "+port);
})

// const express = require('express');
// const app = express();
// const port = 8080;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

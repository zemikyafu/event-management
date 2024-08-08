const express=require('express');
const app=express();
const cors =require('cors');
const authController= require('./controller/authController');
const eventController =require('./controller/eventController');
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


app.post('/api/events',eventController.registerEvent);
app.get('/api/events',eventController.getAllEvents);
app.get('/api/events/:user_id',eventController.getEventByUserId);
app.put('/api/events/:id',eventController.updateEvent);
app.delete('/api/events/:id',eventController.deleteEvent);




const port = process.env.Event_PORT|| 8080;

app.listen(port,()=>{
    console.log("Start listening on Port "+port);
})


import Express from 'express';
import userController from './Controllers/user.js';
import cors from 'cors';

const app = Express();
const port = process.env.port || 3000;

app.use(Express.json());
app.use(cors());

app.get('/users', (req, res) => {
    res.json(userController.getAllUsers())
});

app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (!id) {
        res.sendStatus(400);
    }
    
    res.json(userController.getUserById(id))
});

app.post('/user', (req, res) => {
    const result = userController.addUser(req.body);
    if (result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(201);
    }
});

app.put('/user/:id', (req, res) => {
    const result = userController.editUser(id, req.body);
    if (result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(200);
    }
});

app.delete('/user/:id', (req, res) => {
    const result = userController.deleteUser(id);
    if (result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(200);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}...`)
})
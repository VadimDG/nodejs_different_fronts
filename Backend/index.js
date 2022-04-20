import Express from 'express';
import userController from './Controllers/user.js';
import platformController from './Controllers/platform.js';
import labelController from './Controllers/label.js';
import contactController from './Controllers/contact.js';
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

app.get('/platforms', (req, res) => {
    res.json(platformController.getAllPlatforms())
});

app.get('/platform/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (!id) {
        res.sendStatus(400);
    }
    
    res.json(platformController.getPlatformById(id))
});

app.post('/platform', (req, res) => {
    const result = platformController.addPlatform(req.body);
    if (result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(201);
    }
});

app.put('/platform/:id', (req, res) => {
    const result = platformController.editPlatform(id, req.body);
    if (result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(200);
    }
});

app.delete('/platform/:id', (req, res) => {
    const result = platformController.deletePlatform(id);
    if (result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(200);
    }
});

app.get('/labels', (req, res) => {
    res.json(labelController.getAllLabels())
});

app.get('/label/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (!id) {
        res.sendStatus(400);
    }
    
    res.json(labelController.getLabelById(id))
});

app.post('/label', (req, res) => {
    const result = labelController.addLabel(req.body);
    if (result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(201);
    }
});

app.put('/label/:id', (req, res) => {
    const result = labelController.editLabel(id, req.body);
    if (result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(200);
    }
});

app.delete('/label/:id', (req, res) => {
    const result = labelController.deleteLabel(id);
    if (result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(200);
    }
});

app.get('/contacts', (req, res) => {
    res.json(contactController.getAllContacts())
});

app.get('/contacts-with-relations', (req, res) => {
    res.json(contactController.getAllContactsWithRelations())
});

app.get('/contact/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (!id) {
        res.sendStatus(400);
    }
    
    res.json(conatactController.getContactById(id))
});

app.post('/contact', (req, res) => {
    const result = contactController.addContact(req.body);
    if (result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(201);
    }
});

app.put('/contact/:id', (req, res) => {
    const result = contactController.editContact(id, req.body);
    if (result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(200);
    }
});

app.delete('/contact/:id', (req, res) => {
    const result = contactController.deleteContact(id);
    if (result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(200);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}...`)
})
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const Path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static(Path.join(__dirname,`../dream`)))

app.use(cors());

mongoose.connect('mongodb+srv://aryangrover:Aryan123@cluster0.kuot8.mongodb.net/theskillboost')
    .then(() => console.log("connected"))
    .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Contact: String,
    Qualification: String,
    Course: String



});

const UserModel = mongoose.model("user", UserSchema);

app.get('/', (req, res) => {
    res.sendFile(Path.join(__dirname, '../dream/index.html'));
});


app.get('/admin', (req, res) => {
    res.sendFile(Path.join(__dirname, '../dream/form.html'));
});
app.get('/dashboard', (req, res) => {

    UserModel.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => console.log(err))
});



app.post('/create', (req, res) => {
    
    const { Name, Email, Contact,Qualification,Course } = req.body;

    UserModel.create({ Name, Email, Contact,Qualification,Course })
        .then((data) => {
            res.json(data);  
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error creating user.');
        });
});



app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log("Deleting user with ID:", id);

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    UserModel.findByIdAndDelete(id)
        .then(response => {
            if (!response) {
                return res.status(404).json({ error: 'User not found' });
            }
           
            res.json({ message: 'User deleted successfully', user: response });
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        });
});


const UserSchema1 = new mongoose.Schema({
    Name: String,
    email: String,
    Number: String,
    Message: String,
    Subject: String



});

const UserModel1 = mongoose.model("query", UserSchema1);


app.get('/dashboard1', (req, res) => {

    UserModel1.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => console.log(err))
});



app.post('/create1', (req, res) => {
    
    const { Name, email, Number,Message,Subject } = req.body;

    UserModel1.create({ Name, email, Number,Message,Subject })
        .then((data) => {
            res.json(data);  
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error creating user.');
        });
});



app.delete('/delete1/:id', (req, res) => {
    const id = req.params.id;
    console.log("Deleting user with ID:", id);

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    UserModel1.findByIdAndDelete(id)
        .then(response => {
            if (!response) {
                return res.status(404).json({ error: 'User not found' });
            }
           
            res.json({ message: 'User deleted successfully', user: response });
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        });
});


app.listen(8081);
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()


const Product = require('./models/productModel')


app.use(express.json())


app.get('/', (req, res) => {
    res.send("hello");
})

//read
app.get('/products', async(req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});      
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});      
    }
})

//create
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//update
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        return res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


//delete
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        return res.status(200).json({message: "A product deleted successfully"});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.listen(1700, () => {
    console.log("Node API app is running on 1700");
})

mongoose.connect(process.env.MONGO_DB_STRING)
.then(() => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log(error);
});
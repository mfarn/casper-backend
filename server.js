require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = (process.env.PORT || 8000);

mongoose.connect("mongodb+srv://mateus:Password123@cluster0.qpf65.mongodb.net/casper-news", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function(err){
    if(err){
        console.log(err)
    } else {
        console.log('MongoDB Conectado com sucesso!')
    }
})

app.use(cors());
app.use(express.json());

const newsRouter = require('./src/routes/news')
app.use('/news', newsRouter);

const adminRouter = require('./src/routes/admin')
app.use('/admin', adminRouter);

app.listen(port, function(){
    console.log(`Server is running on port ${port}`)
} )
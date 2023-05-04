const express = require('express');
const ejs = require('ejs');

const app = express();

app.use(express.static('public'));

app.get('/index', (req, res) => {
    ejs.renderFile('./templates/index.ejs', (err, str) => {
        if (err) {
            console.log(err);
            return res.status(500).send('server error');
        }

        res.send(str);
    })
});


app.get('/search', (req, res) => {
  
});


app.get('/product', (req, res) => {
  
});

app.listen(8081);
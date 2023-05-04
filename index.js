const express = require('express');
const ejs = require('ejs');
const qs = require('qs');

const app = express();

app.use(express.static('public'));

app.get('/index', (req, res) => {
    ejs.renderFile('./templates/index.ejs', (err, str) => {
        if (err) {
            console.log(err);
            return res.status(500).send('server error');
        }

        res.send(str);
    });
});


app.get('/test', (req, res) => {
    const query = qs.parse(req.query) || {};
    const data = {
        id: typeof query.id === 'string' ? Number(query.id) : 0,
    };
    ejs.renderFile('./templates/test.ejs', data, {}, (err, str) => {
        if (err) {
            console.log(err);
            return res.status(500).send('server error');
        }

        res.send(str);
    })
});


app.listen(8081);
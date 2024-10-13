import express from 'express'

const app = express();

app.get('/', function(req, res) {
    res.send('<h1>Hello World!</h1>');
}) 

app.get('/about', (req, res) => {
    res.send("<h2>Hello, My name is Ismail Akram and I'm a software engineer.</h2>");
})

app.listen('3000', function() {
    console.log('Server Started at port 3000.')
});


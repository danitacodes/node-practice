const express = require('express');

//express app

const app = express();

//register view engine
app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Why I started learning code', snippet: 'I started learning'},
        {title: 'What Have I Learned So Far', snippet: 'I have learned'},
        {title: 'What Projects I Have Done', snippet: 'My first project was'},
    ];

    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' });
})

//404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
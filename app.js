const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');

//express app

const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://danita:1luv4all@blog.ziibm.mongodb.net/Blog?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/add-blog', (req, res) =>{
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('60b9a56fcc058a02bcc8e671')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
});

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
     res.render('index', {title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err);
    });
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
    .then((result) =>{
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findbyId(id)
    .then((result) => {
        render('details', { blog: result, title: 'Blog Details'});
    })
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' });
})


//404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
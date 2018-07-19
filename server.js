const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(`${__dirname}/views/layout`);
app.set('view_engine', 'hbs');

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (data)=>{
    return data.toUpperCase();
})

app.use((request, response, next)=>{

    let log = `${new Date().toString()}: ${request.method} ${request.url}`;

    console.log(log);
    fs.appendFile('logger.txt', log, (err)=>{
        if(err){
            console.log('Error with fs');
        }
    });
    next();
});

// app.use((require, response, next)=>{
//     response.render('maintenance.hbs');
// });

app.use(express.static(`${__dirname}/public`));


app.get('/', (request, response)=>{

    response.render('home.hbs', {
        pageTitle: 'Home Page',
        pageMessage: 'This is a home page of the site',
    });

});

app.get('/about', (request, response)=>{

    response.render('about.hbs', {
        pageTitle: 'About US',
    });

});

app.get('/bad', (request, response)=>{
    
    response.send({
        errorMessage: 'Failed to retrive the page'
    })

})

app.listen(port, ()=>{
    console.log('Server is up & running on port',port);
    
});
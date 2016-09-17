var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var article = {
    'article-one': {
        title: 'Article One | Tenzin ',
        heading: 'Article One',
        date: '17 sep, 2016',
        content: `<p> 
                    This is my content of the Article one. This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.
                </p>  
                <p> 
                    This is my content of the Article one. This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.
                </p>
                <p> 
                    This is my content of the Article one. This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one.This is my content of the Article one;
                </p>`
    },
    'article-two': {
        title: 'Article One | Tenzin ',
        heading: 'Article Two',
        date: '18 sep, 2016',
        content: `<p> 
                    This is my content of the Article two. This is my content of the Article two. This is my content of the Article two. This is my content of the Article two. This is my content of the Article two. This is my content of the Article two. This is my content of the Article two. This is my content of the Article two. This is my content of the Article two. This is my content of the Article two.
                  </p>`
    },
    'article-three': {
        title: 'Article Three | Tenzin ',
        heading: 'Article Three',
        date: '19 sep, 2016',
        content: `<p> 
                    This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three.
                </p>  
               <p> 
                    This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three. This is my content of the Article three.
                </p>  
              `
    }
};

function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
        <head>
            <title>
               ${title}
            </title>
            <meta name="viewport" content="width-device-width, initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3> 
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>    
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res){
    //articleName == article-one
    //article[articleName] == {} content of the article-one object
    var articleName = req.params.articleName;
   res.send(createTemplate(article[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

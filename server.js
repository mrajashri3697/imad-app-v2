
var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' :{
                title:'Article One | Rajashri',
                heading:'Article One',
                date:'July 1,2017',
                content:`<p> This is content for my article one. This is content for my article one. This is content for my article one. This is content for my article one. This is content for my article one. This is content for my article one. </p><br/>
                        <p> This is content for my article one. This is content for my article one. This is content for my article one. This is content for my article one. This is content for my article one. This is content for my article one. </p>`
            }, 
    'article-two':{ 
                title:'Article Two| Rajashri',
                heading:'Article Two',
                date:'July 2,2017',
                content:`<p> This is content for my article two. This is content for my article two. This is content for my article two. This is content for my article two. This is content for my article two. This is content for my article two. </p><br/>
                        <p> This is content for my article two. This is content for my article two. This is content for my article two. This is content for my article two. This is content for my article two. This is content for my article two. </p>`
        
            }, 
    'article-three':{ 
                title:'Article Three | Rajashri',
                heading:'Article Three',
                 date:'July 3,2017',
                content:`<p> This is content for my article Three. This is content for my article Three. This is content for my article Three. This is content for my article Three. This is content for my article Three. This is content for my article Three. </p><br/>
                        <p> This is content for my article Three. This is content for my article Three. This is content for my article Three. This is content for my article Three. This is content for my article Three. This is content for my article Three. </p>`
        
             }
};


function createTemplate(data)
{
    
        var title=data.title;
        var date=data.date;
        var heading=data.heading;
        var content=data.content;
        var htmlTemplate = `
        <html>
            <head>
              <title>${title}</title>    
              <meta view="viewport" content="width=device-width" initial-scale="1"/>
              <link rel="stylesheet" href="/ui/style.css" />
            </head>
            <body>
                <div>
                    <a href="/" >HOME</a>
                    <hr/>
              </div>
              <div class="container">
                <h3> ${heading} </h3>
                <div> ${date} </div>
              
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

app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
}); 

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
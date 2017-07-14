
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user:'mrajashri3697',
    database:'mrajashri3697',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password: 'db-mrajashri3697-30619'
    
};
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


function createUserTemplate(data)
{
    
        var id=data.id;
        var date=data.bdate;
        var username=data.Username;
        var FN=data.FirstName;
        var LN=data.LastName;
        var cid=data.course_id;
        var htmlTemplate = `
        <html>
            <head>
              <title>${id}</title>    
              <meta view="viewport" content="width=device-width" initial-scale="1"/>
              <link rel="stylesheet" href="/ui/style.css" />
            </head>
            <body>
                <div>
                    <a href="/" >HOME</a>
                    <hr/>
              </div>
              <div class="container">
                <h3> ${username} </h3>
                <div> ${date} </div>
              
                <div>
                    ${FN}
                    ${LN}
                    ${cid}
                </div>
              </div>
              
            </body>
        </html>
        `;
        return htmlTemplate;
}

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

var counter = 0;

app.get('/counter',function(req,res){ 
    counter = counter + 1;
    res.send(counter.toString());
    
});


app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test', function(err,result){
        if(err) res.status(500).send(err.toString());
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
    
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/me.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'me.jpg'));
});

var names = [];
app.get('/submit-name', function (req, res) {
 var name = req.query.name;
 names.push(name);
 res.send(JSON.stringify(names));
});



app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
}); 

var pool = new Pool(config);
app.get('/user/:userName', function (req, res) {
   var data = req.params.userName;
    
    pool.query("SELECT * from User", function(err,result){
        if(err) res.status(500).send(err.toString());
        else 
        {
            if(result.rows.length === 0)
            {
                res.status(404).send("Article not Found.");
            }
            else
            {
                var UserData= result.rows[0];
                res.send(createUserTemplate(UserData));
            }
            
                
        }
         
    });
  
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
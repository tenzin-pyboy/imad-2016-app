var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'tenzin-pyboy',
    database: 'tenzin-pyboy',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}; 


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content; 

    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
            
            <!-- Latest compiled and minified CSS -->
            <link rel="stylesheet" type="text/css" href="./ui/style.css">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
            
            <!-- Optional theme -->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <nav class="navbar navbar-inverse navbar-fixed-top">
              <div class="container">
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="#">App Blog</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                  <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Profile</a></li>
                    <li><a href="#about">Login</a></li>
                    <li><a href="#contact">Register</a></li>
                    <button id="logoutBtn" class="btn btn-primary pull-right" type="submit">Log Out</button>
                  </ul>
                
                </div><!--/.navbar-collapse -->
              </div>
            </nav>
            <div class="container">
                <div>
                  <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                  ${heading}
                </h3>
                <hr/>
                <div>
                    ${date.toDateString()}
                </div>
                <div id="article-para">
                    ${content}
                </div>
                <form action="" method="POST">
                <fieldset>
                    <legend> Add a Comment</legend>
                    <label for="handle">E-mail</label>
                    <input type="text" name="handle" id="handle" vlue="" maxlength="64" />
                    <br /><br />
                    <label for="comment">Comment</label>
                    <textarea rows="6" cols="50" name="comment" id="comment"></textarea>
                    <br /><br />
                    <input type="submit" value="Submit" />
                </fieldset>
                </form>
                <div>
                    <script type="text/javascript" src="/ui/main.js">
                    </script>
                </div>
                <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

                <!-- Latest compiled and minified JavaScript -->
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'register.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});

app.get('/layout', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'layout.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

function hash(input, salt) {
    //create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');   // converts input into 512 bits random string
    return ['pbkdf2', '10000', salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res) {
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user', function (req, res) {
   // username, password
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function(err, result) {
       if(err) {
            res.status(500).send(err.toString());
        } else {
            res.send('User is sucessfully created: ' + username );
        }
   });
});

app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err, result) {
       if(err) {
            res.status(500).send(err.toString());
        } else {
            if(result.rows.length === 0) {
                res.send(403).send('username/password is invalid ! :(');
            } else {
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2]; // extracting the original salt value
                var hashedPassword = hash(password, salt); // creating a hash based on the password submitted and the original salt value
                if(dbString === hashedPassword) {
                    
                    //set the session
                    req.session.auth = {userId: result.rows[0].id};
                    // set cookie with the session id
                    // Internally, on the server side, it maps the session id ot the object  
                    // Now the Object looks like {auth: {userId: id}}
                    
                    res.send('Credentials are correct :)');
                } else {
                    res.send(403).send('username/password is invalid ! :(');
                }
             }
        }
    });
});

app.get('/check-login', function(req, res) {
    if(req.session && req.session.auth && req.session.auth.userId) {
        res.send('You are logged in: ' + req.session.auth.userId.toString());
    } else {
        res.send('You are not logged in');
    }
});

app.get('/logout', function(req, res) {
    delete res.session.auth;
    res.send("Your are logged out");
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    //make a select request
    //retrun a response with result
    pool.query('SELECT * FROM test', function (err, result) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.get('/articles/:articleName', function (req, res) {
  // articleName == article-one
  // articles[articleName] == {} content object for article one
  
   // SELECT * FROM articles WHERE title ='\'; DELETE FROM articles WHERE 'a' = \'a'
   pool.query("SELECT * FROM articles WHERE title = $1", [req.params.articleName], function (err, result) {
      if(err) {
          res.status(500).send(err.toString());
      } else {
          if(result.rows.length === 0) {
              res.status(404).send('Article not Found');
          } else {
              var articleData = result.rows[0];
              res.send(createTemplate(articleData));
          }
      }
  }); 
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

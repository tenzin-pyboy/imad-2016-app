// Counter Code
var button = document.getElementById("counter");

button.onclick = function () {
  // Create a request Object
  var request = new XMLHttpRequest();

  // Capture the respond and store it in a variable
  request.onreadystatechange = function () {
    if(request.readyState == XMLHttpRequest.DONE) {
      
      //Take acction
      if(request.status === 200){
        var counter = request.responseText;

        // render the variable in correct span
        var span = document.getElementById("count");
        span.innerHTML = counter.toString();
      }
    }
  };
  // Make actual request
  request.open('GET', 'http://tenzin-pyboy.imad.hasura-app.io/counter', true);
  request.send(null);
};

var submit = document.getElementById('submit_btn');
submit.onclick = function () {
  // Make a request to the server and send the name
    // Create a request Object
  var request = new XMLHttpRequest();

  // Capture the respond and store it in a variable
  request.onreadystatechange = function () {
    if(request.readyState == XMLHttpRequest.DONE) {
      
      //Take acction
      if(request.status === 200){
        
        // Capture a list of names and render it as a list.
          var names = request.responseText;
          names = JSON.parse(names);
          var list = '';
          for(var i=0; i<names.length; i++) {
            list += '<li>' + names[i] + '</li>';
          }
          var ul = document.getElementById('namelist');
          ul.innerHTML = list;
      }
    }
  };
  
  //Submit name
  var nameInput = document.getElementById('name');
  var name = nameInput.value;
  
  // Make actual request
  request.open('GET', 'http://tenzin-pyboy.imad.hasura-app.io/submit-name?name= '+ name, true);
  request.send(null);
};


submitArticle = document.getElementById('submit_btn');
submitArticle.onclick = function () {
    // Make requestt to server  and send the article
    // Create a request Object
    var request = new XMLHttpRequest();
    
    // Capture the respond and store it in a variable
    request.onreadystatechange = function () {
        
        //Take action
        if(request.status === 200 ) {
            
            // Capture the list of articles and render it as a list.
            var articles = request.responseText;
            articles = JSON.parse(articles);
            var list = '';
            for(var i=0; i<articles.length; i++) {
                list += '<p>' + articles[i] + '</p>';
            }
            var ul = document.getElementById('articles-para');
            ul.innerHTML = list;
        }
    };
    
    //submit article 
    var articleInput = document.getElementById('article');
    var article = articleInput.value;
    
    //Make actual reqest 
    request.open('GET', 'http;//tenzin-pyboy.imad.hasura-app.io/submit-articles?article= ' + article, true);
    request.send(null);
};




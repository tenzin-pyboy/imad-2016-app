
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

//Submit usename and password to login
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
            console.log('user logged in');
            alert('Logged in sucessufully');
        } else if(request.status === 403) {
            alert('username/password incorrect');
        } else if(request.status === 500) {
            alert('Something went wrong on the server');
        }
    }
  };
  
  //Submit name
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  console.log(username);
  console.log(password);
  // Make actual request
  request.open('POST', 'http://tenzin-pyboy.imad.hasura-app.io/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username, password: password}));
};





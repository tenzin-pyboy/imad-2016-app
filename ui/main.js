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
  request.open('GET', 'http://127.0.0.1:8080/counter', true);
  request.send(null);
};

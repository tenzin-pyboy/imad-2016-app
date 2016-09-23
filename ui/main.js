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
  request.open('GET', 'http://http://tenzin-pyboy.imad.hasura-app.io/counter', true);
  request.send(null);
};

//Submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
  // Make a request to the server and send the name

  // Capture a list of names and render it as a list.
  var names = ['name1', 'name2', 'name3', 'name4'];
  var list = '';
  for(var i=0; i<names.length; i++) {
    list += '<li>' + names[i] + '</li>';
  }
  var ul = document.getElementById('namelist');
  ul.innerHTML = list;

}

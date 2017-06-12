"use strict";

function search() {
  var input = document.getElementById('input').value
  if (input == '') {input = 'nothing';}
  var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search='+input;
  reqestData(url, parseData);
}

function random() {
  var url = 'https://en.wikipedia.org/w/api.php?action=query&list=random&origin=*&format=json&rnnamespace=0';
  reqestData(url, parseRandom);
}

function parseRandom(json) {
  var title = json.query.random["0"].title;
  document.getElementById('input').value = title;
  search();
}

function parseData(json) {
  var parent = document.getElementById('resultContainer');
  var children = parent.childNodes.length;
  for (var i = 0; i < children; i++) {
    parent.removeChild(parent.childNodes[0]);
  }
  var len = json[1].length;
  if (len == 0) {
    var entry = document.createElement("div");
    entry.setAttribute('class', 'entry')
    var description = document.createElement("div");
    description.appendChild(document.createTextNode("no results, try again"));
    description.setAttribute('class', 'description')
    entry.appendChild(description);
    parent.appendChild(entry);
    parent.classList.remove('hide');
    return;
  }
  for (var i = 0; i < len; i++) {
    var entry = document.createElement("div");
    entry.setAttribute('class', 'entry')
    var title = document.createElement("a");
    title.appendChild(document.createTextNode(json[1][i]));
    title.setAttribute('class', 'title')
    title.setAttribute('href', json[3][i])
    var description = document.createElement("div");
    description.appendChild(document.createTextNode(json[2][i]));
    description.setAttribute('class', 'description')
    entry.appendChild(title);
    entry.appendChild(description);
    parent.appendChild(entry);
  }
  parent.classList.remove('hide');
}

function reqestData(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(xhttp.responseText);
      callback(json);
    }
  }
  xhttp.open("GET", url, true);
  xhttp.send();
}

document.addEventListener("keydown", (event)=>{if (event.keyCode == 13) {search();}}, true);

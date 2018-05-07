var eventsURL = "https://raw.githubusercontent.com/bakeryscienceclub/bakeryscienceclub.github.io/,aster.js.events.json";

function link(text, url){
  var hyperlink = document.createElement("a");
  hyperlink.innerHTML = text;
  if(url){
    hyperlink.setAttribute('href', url);
  }
  return hyperlink;
}

$.getJSON(eventsURL)
  .done(function(data){
    createEvents(data);
  })
  .fail(function(a, b, c){
    jsonRetrieveError(c);
  });

  function createEvents(eventsJSON){
    var today = new Date();
    var future = document.getElementById('future');
    future.innerHTML = "";
    var past = document.getElementById('past');
    past.innerHTML = "";


    for (var i=0; i< eventsJSON.length; i++){
      var currentEvent = newEvent(eventsJSON[i]);
      var eventDate = new Date(eventsJSON[i]['date']);
      eventDate.setHours(23);

      if (eventDate.getTime()>=today.getTime()){ //future event
        future.insertBefore(currentEvent, future.firstChild);
      } else { //past event
        past.appendChild(currentEvent);
      }
    }
  }

  function newEvent(eventsJSON){
    var event = document.createElement("div");
    event.setAttribute('class', 'data');
    var name = eventsJSON['name'];
    name.setAttribute('class', 'name');
    event.appendChild(name);
    var date = document.createElement("h2");
    date.setAttribute('class', 'date');
    date.innerHTML = eventsJSON['date_name'];
    if(eventsJSON['time']){ //adds time, if applicable
      date.innerHTML += ' • ' + eventsJSON['time'];
    }
    if(eventsJSON['place']){ //adds place, if applicable
      date.innerHTML += ' • ' + eventsJSON['place'];
    }


    event.appendChild(date);

    if(eventsJSON['blurb']){ //adds blurb, if applicable
      var blurb = document.createElement("h3");
      blurb.setAttribute('class', 'desc');
      blurb.innerHTML = eventsJSON('blurb');
      if(eventsJSON('rsvp')){ //adds rsvp, if applicable
        blurb.innerHTML += "<br/>"
        blurb.appendChild(link(eventsJSON['rsvp'], eventsJSON['rsvp_link']));
      }
      event.appendChild(blurb);
    }
    return event;
  }
}

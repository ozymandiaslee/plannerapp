$(document).ready(function () {
var hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
var hourdiv = $("#hourdiv");
var currentDateEl = $("#currentdate");
var savedEvents = [];


function createHourElements() {
    //loop through the hours array and create DOM elements for corresponding hours
    for (var i = 0; i < hours.length; i++) {
        var outerdivEl = $("<div>");
        var divEl = $("<form>");
        var innerEl = $("<div>");
        var spanEl = $("<span>");
        var inputEl = $("<input>");
        var buttonDivEl = $("<div>");
        var buttonEl = $("<button>");
        var eventEl = $("<div>");
        eventEl.attr({
            class: "event-hours list-group",
            'data-index': hours[i]
        });
        outerdivEl.attr({
            id: hours.indexOf(hours[i]) + 9,
            class: "hours"
        });
        divEl.attr({
            class: "input-group mb-3",
            "data-index": hours[i],
        });
        innerEl.attr({
            class: "input-group-prepend",       
        });
        buttonDivEl.attr("class", "input-group-append");
        buttonEl.attr({
            class: "btn btn-outline-secondary",
            type: "submit",
            id: "updatebutton"
        });
        buttonEl.text("Add Event");
        if (moment().format("H") >= hours.indexOf(hours[i]) + 9) {
        spanEl.attr({
            class: "input-group-text bg-danger",
            id: "basic-addon-1",
            style: "width: 70px"    
        });
        }
        else if (moment().format("H") < hours.indexOf(hours[i]) + 9) {
            spanEl.attr({
                class: "input-group-text bg-success",
                id: "basic-addon-1",
                style: "width: 70px"    
            });
        }
        spanEl.text(hours[i] + ":00");
        inputEl.attr({
            type: "text",
            class: "form-control",
            "aria-label": "hour",
            "aria-describedby": "basic-addon-1",
            id: "eventInput"
        });
        innerEl.append(spanEl);
        divEl.append(innerEl);
        divEl.append(inputEl);
        buttonDivEl.append(buttonEl);
        divEl.append(buttonDivEl);
        outerdivEl.append(divEl);
        outerdivEl.append(eventEl);
        hourdiv.append(outerdivEl);

    }
}


function currentDateElement() {
    //capturing current date using moment and printing to our current date element
    currentDateEl.text(moment().format('MMMM Do YYYY'));
}

function renderEvents() {
    //creating a collection variable of our event-hours nodelist
    var nodeList = $(".event-hours");
    //removing rendered events to avoid duplication
    $( ".schedule" ).remove();
    //looping through our savedEvents array captured from localStorage and our nodelist collection to compare values
    for (let z = 0; z < savedEvents.length; z++) {
        for (let i = 0; i < nodeList.length; i++){
            console.log(nodeList[i].getAttribute('data-index'));
        if (savedEvents[z].index === nodeList[i].getAttribute('data-index')){
            //appending a new event div for each localStorage event to our matching nodeList div
            $(nodeList[i]).append(`<button type="button" class="schedule list-group-item-action">${savedEvents[z].event}</button>`);
        }      
      }
}
};


function init() {

    //reassigning our storedEvents global variable to our localStorage savedEvents
    var storedEvents = JSON.parse(localStorage.getItem("savedEvents"));
    
  if (storedEvents !== null) {
    savedEvents = storedEvents;
    console.log(savedEvents);
  }
  //running our other init functions
    currentDateElement();
    createHourElements();
    renderEvents();
}

//running init
init();

//event handler for saving events to localStorage
$("form").on("click", function(event) {
    // prevent the button from trying to submit the form
    event.preventDefault();
    var target = $(event.target);
    if (target.is("#updatebutton")) {
        var update = $(this).find("#eventInput").val().trim();
        if (update !== "") {
        var hourIndex = $(this).attr("data-index");
        var savedEvent = {
            index: hourIndex,
            event: update
        }
        savedEvents.push(savedEvent);
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
        //rerendering the events using the updated array
        renderEvents();
        //clear the input field
        $(this).find("#eventInput").val('');
    }
    }
    else {
        return;
    }
});


$('body').on("click", function(event) {
    event.preventDefault();
    var target = $(event.target);
    if (target.is('.schedule')) {
        var storedEvents = JSON.parse(localStorage.getItem("savedEvents"));
        var storageText = target.text();
        var storageKey = target.parent().attr('data-index');
        console.log(storageText);
        console.log(storageKey);
        console.log(storedEvents);
        for (let i = 0; i < storedEvents.length; i++) {
            if (storedEvents[i].event === storageText && storageKey === storedEvents[i].index) {
                storedEvents.splice(i, 1);
                console.log(storedEvents);
            }
        }
        localStorage.setItem("savedEvents", JSON.stringify(storedEvents));
        savedEvents = storedEvents;
        renderEvents();
    }
    else {
        return;
    }

    // savedEvents.
});

});

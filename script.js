var hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
var hourdiv = $("#hourdiv");
var currentDateEl = $("#currentdate");
var savedEvents = $()

function createHourElements() {
    for (var i = 0; i < hours.length; i++) {
        var divEl = $("<form>");
        var innerEl = $("<div>");
        var spanEl = $("<span>");
        var inputEl = $("<input>");
        var buttonDivEl = $("<div>");
        var buttonEl = $("<button>");
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
        hourdiv.append(divEl);
    }
}
function currentDateElement() {
    currentDateEl.text(moment().format('MMMM Do YYYY'));
}



function init() {
    currentDateElement();
    createHourElements();
}


init();

$("form").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    var target = $(event.target);
    if (target.is("button")) {
        var update = $(this).find("#eventInput").val().trim();
        var hourIndex = $(this).attr("data-index");
        var savedEvents = {
            index: hourIndex,
            event: update
        }
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }
    else {
        return;
    }
});
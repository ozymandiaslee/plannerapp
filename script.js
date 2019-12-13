var hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
var hourdiv = $("#hourdiv");
var currentDateEl = $("#currentdate");

function createHourElements() {
    for (var i = 0; i < hours.length; i++) {
        var divEl = $("<div>");
        var innerEl = $("<div>");
        var spanEl = $("<span>");
        var inputEl = $("<input>");
        divEl.attr("class", "input-group mb-3");
        innerEl.attr({
            class: "input-group-prepend",       
        });
        if (moment().format("H") > hours.indexOf(hours[i]) + 9) {
        spanEl.attr({
            class: "input-group-text bg-danger",
            id: "basic-addon-1",
            style: "width: 70px"    
        });
        }
        else if (moment().format("H") <= hours.indexOf(hours[i]) + 9) {
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
            "aria-describedby": "basic-addon-1"
        });
        innerEl.append(spanEl);
        divEl.append(innerEl);
        divEl.append(inputEl);
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
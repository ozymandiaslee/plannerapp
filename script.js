var hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
var hourdiv = $("#hourdiv");

function createHourElements() {
    for (var i = 0; i < hours.length; i++) {
        var divEl = $("<div>");
        var innerEl = $("<div>");
        var spanEl = $("<span>");
        var inputEl = $("<input>");
        divEl.attr("class", "input-group mb-3");
        innerEl.attr("class", "input-group-prepend");
        spanEl.attr({
            class: "input-group-text",
            id: "basic-addon-1",
        });
        spanEl.text("Update");
        inputEl.attr({
            type: "text",
            class: "form-control",
            placeholder: hours[i] + " o'clock",
            "aria-label": "hour",
            "aria-describedby": "basic-addon-1"
        });
        innerEl.append(spanEl);
        divEl.append(innerEl);
        divEl.append(inputEl);
        hourdiv.append(divEl);
    }
}

createHourElements();
var blockContainer = $(".container");
var events = JSON.parse(localStorage.getItem("events"));

/**
 * Generates a time block given a time, content and a tense
 * @param {string} time The time of the event
 * @param {string} content The text descriptor of the event
 * @param {string} tense The tense of the event in relation to the current time
 * @returns 
 */
function generateBlock(time, content, tense){
    return `
    <div class="time-block container">
        <div class="row">
            <div class="hour col-1">${time}</div>
            <textarea id="${time}-text" class="${tense} col">${content}</textarea>
            <button id="${time}-btn" class="saveBtn col-1" data-time="${time}"><i class="fas fa-lock"></i></button>
        </div>
    </div>`;
}

/**
 * Renders time blocks to index.html
 */
 function renderTimeBlocks(){
    console.log(events);
    if(!events){
        events = {};
    }
    for(var i = 9; i <= 17; i++){
        // I am addicted to these shorthand if statements.
        var period = i > 11 ? "pm" : "am";
        var time = (i === 12 ? i : i % 12) + period;
        var currentHour = moment().hour();
        var content = events[time] ? events[time] : "";
        console.log(events[time]);
        var tense = currentHour > i ? "past" : "future";
        tense = currentHour == i ? "present" : tense;
        blockContainer.append(generateBlock(time, content, tense));
        $(`#${time}-btn`).click(saveEvent);
    }
}

/**
 * Saves an event to local storage
 * @param {Event} e the Event object that triggered the save
 */
function saveEvent(e){
    var time = e.currentTarget.dataset.time;
    var content = $(`#${time}-text`).val();
    events[time] = content;
    console.log(events);
    localStorage.setItem("events", JSON.stringify(events));
}

renderTimeBlocks();
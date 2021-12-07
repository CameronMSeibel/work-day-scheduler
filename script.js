var blockContainer = $(".container");

function renderTimeBlocks(){
    for(var i = 9; i <= 17; i++){
        var period = i > 11 ? "pm" : "am";
        var time = i === 12 ? i : i % 12;
        var currentHour = moment().hour();
        var tense = currentHour > i ? "past" : "future";
        tense = currentHour == i ? "present" : tense;
        blockContainer.append(renderBlock(time+period, "", tense));
    }
}

function renderBlock(time, content, tense){
    return `
    <div class="time-block container">
        <div class="row">
            <div class="hour col-1">${time}</div>
            <textarea id="${time}-text" class="${tense} col">${content}</textarea>
            <button id="${time}-btn" class="saveBtn col-1"><i class="fas fa-lock"></i></button>
        </div>
    </div>`;
}

renderTimeBlocks();
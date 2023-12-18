import { directions } from "./enums";
import { chooseCycle } from "./initCycle";

let card = null;
let show = null;
let buttons = null;

function initStandardCycle(cardProp, showProp, buttonsProp) {
    card = cardProp;
    show = showProp;
    buttons = buttonsProp;

    showStandardQuestion();
}

function showStandardQuestion() {
    if(card.value.direction === directions.FORWARD) {
        show.value.writing = true;
        buttons.value.action = showReading;
    } else {
        show.value.translation = true;
        buttons.value.action = showStandartAnswer;
    }
}

function showReading() {
    show.value.reading = true;
  
    Object.assign(buttons.value, {
      showSides: true,
      action: quickRecognition
    });
  }
  
  function quickRecognition(mark) {
    console.log(mark);
    card.value.recogMark = mark;
    showStandartAnswer();
  }
  
  function showAnswer() {
    show.value = {
      writing: false,
      reading: false,
      translation: true,
      answer: true
    }
  }
  
  function showStandartAnswer() {
    showAnswer();
    Object.assign(buttons.value, {
      showSides: true,
      action: chooseCycle
    });
  }

export { initStandardCycle };
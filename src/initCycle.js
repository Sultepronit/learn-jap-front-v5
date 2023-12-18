import nextCard from "./nextCard";
import { initStandardCycle } from "./standardCycle";

let progress = null;
let lists = null;
let card = null;
let show = null;
let buttons = null;

function initCycle(progressProp, listsProp, cardProp, showProp, buttonsProp) {
    progress = progressProp;
    lists = listsProp
    card = cardProp;
    show = showProp;
    buttons = buttonsProp;

    chooseCycle();
}

function chooseCycle() {
    progress.value.cardPassed++;
  
    card.value = nextCard(lists);
    
    buttons.value = {
      showCentral: true,
      showSides: false,
    };
  
    show.value = {
      writing: false,
      reading: false,
      translation: false,
      answer: false
    }
  
    // autorepeat
    if(card.value[`${card.value.direction}AutoRepeat`]) {
      showAnswerAndAutorepeat();
      return;
    }
  
    // recognition
  
    // learn/confrim/repeat
    // showStandardQuestion();
    initStandardCycle(card, show, buttons);
  }

export default initCycle;
export { chooseCycle };
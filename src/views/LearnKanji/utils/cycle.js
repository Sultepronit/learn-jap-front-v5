import { ref } from "vue";
import { marks } from "./enums";
import nextCard from "./nextCard";
import linksToLists from './linksToLists';
import { change as buttons } from './buttonsControls.js';
import evaluateAndSave from './evaluateAndSave';

const card = ref({});
const ended = ref(false);
const showAnswer = ref(false);

function endSession() {
    ended.value = true;
    localStorage.clear();
}

function nextCycle() {
    card.value = nextCard();
    if(!card.value) {
        endSession();
        return;
    }
  
    if(card.value.autorepeat) {
        // console.log('autorepeat!');
        autorepeat();
    } else {
        question();
    }    
}

function autorepeat() {
    // nextCycle();
    evaluateSaveNext(marks.AUTOREPEAT);
}

function question() {
    showAnswer.value = false;

    linksToLists(card.value);

    buttons.singleButton();
    buttons.setAction(answer);
}

function answer() {
    showAnswer.value = true;

    buttons.setAction(evaluateSaveNext);
    buttons.threeButtons();
    if(card.value.kanjiStats > 0 && card.value.progress === 0) {
        buttons.fourthButton();
    }
}

function evaluateSaveNext(mark) {
    console.log(mark);
    // console.log(marks.GOOD.is(mark));
    card.value.mark = mark;

    evaluateAndSave(card);
    
    nextCycle();
}

export { nextCycle, card, showAnswer, ended };
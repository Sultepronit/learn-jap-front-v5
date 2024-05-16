import { ref } from "vue";
import { marks, repeatStages } from "./enums";
import nextCard from "./nextCard";
import linksToLists from './linksToLists';
import { change as buttons } from './buttonsControls.js';
import evaluateAndSave from './evaluateAndSave';
import { removeSession } from "../services/backup";

const card = ref({});
const ended = ref(false);
const showAnswer = ref(false);

function endSession() {
    ended.value = true;
    // localStorage.clear();
    removeSession();
}

function nextCycle() {
    card.value = nextCard();
    if(!card.value) {
        endSession();
        return;
    }
  
    if(card.value.autorepeat) {
        autorepeat();
    } else {
        question();
    }    
}

function autorepeat() {
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
    if(card.value.repeatStage === repeatStages.REMEMBER) {
        buttons.twoButtons();
    } else {
        buttons.fourButtons();
        if(card.value.record > 0) {
            buttons.bestButton();
        }
    }
}

function evaluateSaveNext(mark) {
    console.log(mark);
    card.value.mark = mark;

    evaluateAndSave(card);
    
    nextCycle();
}

export { nextCycle, card, showAnswer, ended };
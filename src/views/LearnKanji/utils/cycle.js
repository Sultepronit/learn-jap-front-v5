import { ref } from "vue";
import { repeatStages } from "./enums";
import nextCard from "./nextCard";
// import linksToLists from './linksToLists';
import linksToLists from '@/utils/linksToLists';
import { change as buttons } from './buttonsControls.js';
import evaluateAndSave from './evaluateAndSave';
import { removeSession } from "../services/backup";

const card = ref({});
const ended = ref(false);
const showAnswer = ref(false);

function endSession() {
    ended.value = true;
    removeSession();
}

function nextCycle() {
    card.value = nextCard();
    
    if(!card.value) {
        endSession();
        return;
    }
  
    question();  
}

function question() {
    showAnswer.value = false;

    linksToLists(card.value);

    // buttons.singleButton();
    buttons.setButtons(false, false, true);
    buttons.setAction(answer);
}

function answer() {
    showAnswer.value = true;

    buttons.setAction(evaluateSaveNext);
    if(card.value.repeatStage === repeatStages.REMEMBER) {
        // buttons.twoButtons();
        buttons.setButtons(false, false, true, true, card.value.repeatStatus > 0);
    } else {
        buttons.setButtons(card.value.record > 0, true, false, true, card.value.repeatStatus > 0);
        // buttons.fourButtons();
        // if(card.value.record > 0) {
        //     buttons.bestButton();
        // }
    }
}

function evaluateSaveNext(mark) {
    console.log(mark);
    card.value.mark = mark;

    evaluateAndSave(card);
    
    nextCycle();
}

export { nextCycle, card, showAnswer, ended };
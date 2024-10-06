import { ref } from "vue";
import { repeatStages, directions, marks } from "./enums";
import nextCard from "./nextCard";
import { changeShow as cardDisplay } from "./displayControls";
import { change as buttons } from './buttonsControls.js';
import playAudio from "./playAudio";
import evaluateAndSave from './evaluateAndSave';
import { removeSession } from "../services/backup";

const card = ref({});
const ended = ref(false);

function endSession() {
    ended.value = true;
    removeSession();
}

function nextCycle() {
    cardDisplay.hideEverything();
    buttons.singleButton();
  
    card.value = nextCard();
    if(!card.value) {
        endSession();
        return;
    }
  
    if(card.value.repeatStage === repeatStages.AUTOREPEAT) {
        autorepeat();
    } else {
        question();
    }    
}

// autorepeat //-----------------------------------------
function autorepeat() {
    showAnswerAndPlay();

    evaluateAndSave(card);

    buttons.setAction(nextCycle);
}

// learn/confrim/repeat //-----------------------------------------
function question() {
    if(card.value.direction === directions.FORWARD) {
        cardDisplay.showWriting();
        buttons.setAction(showReading)
    } else {
        cardDisplay.showTranslation();
        buttons.setAction(answer);
    }
}

function showReading() {
    cardDisplay.showReading();

    buttons.goodBad();
    buttons.setAction(quickRecognition);
}

function quickRecognition(mark) {
    card.value.recogMark = mark;
    answer();
}

function answer() {
    showAnswerAndPlay();

    if(card.value.mark === marks.RETURN) {
        buttons.passReturn();
    } else if(card.value.repeatStage === repeatStages.CONFIRM) {
        buttons.goodPassBad();
    } else if(card.value.recogMark === marks.BAD && !card.value.altWriting) {
        buttons.returnBad();
    } else {
        buttons.goodReturnBad();
    }
    
    buttons.setAction(evaluateSaveNext);
}

// common //-----------------------------------------
function showAnswerAndPlay() {
    cardDisplay.showAnswer();
    playAudio();
}
function evaluateSaveNext(mark) {
    console.log(mark);
    card.value.mark = mark;

    evaluateAndSave(card);
    
    nextCycle();
}  

export { nextCycle, card, ended };
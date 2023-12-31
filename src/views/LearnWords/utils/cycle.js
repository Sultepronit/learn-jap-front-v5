import { ref } from "vue";
import { learnStages, directions } from "./enums";
import nextCard from "./nextCard";
import { changeShow as cardDisplay } from "./displayControls";
import { change as buttons } from './buttonsControls.js';
import playAudio from "./playAudio";

const card = ref({});

function nextCycle() {
    cardDisplay.hideEverything();
    buttons.singleButton();
    // progress.value.cardPassed++;
  
    card.value = nextCard();
  
    if(card.value[`${card.value.direction}AutoRepeat`]) {
        autorepeat();
    } else if(card.value.learnStage === learnStages.RECOGNIZE) {
        recognition();
    } else {
        question();
    }    
}

// autorepeat //-----------------------------------------
function autorepeat() {
    showAnswerAndPlay();
    // change & save
    card.value.autorepeated = true; // adds black border
    buttons.setAction(nextCycle);
}

// recognition //-----------------------------------------
function recognition() {
    cardDisplay.showWriting();
    card.value.recogMark = { name: 'question' };
    buttons.setAction(recognitionAnswer);
}
  
function recognitionAnswer() {
    showAnswerAndPlay();
    buttons.twoButtons();
    buttons.setAction(evaluateAndSave);
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

    if(card.value.learnStage === learnStages.LEARN) {
        buttons.twoButtons();
    } else {
        buttons.threeButtons();
    }
    buttons.setAction(quickRecognition);
}

function quickRecognition(mark) {
    answer();
    card.value.recogMark = mark;
}

function answer() {
    showAnswerAndPlay();

    if(card.value.learnStage === learnStages.LEARN) {
        buttons.twoButtons();
    } else {
        buttons.threeButtons();
    }
    buttons.setAction(evaluateAndSave);
}

// common //-----------------------------------------
function showAnswerAndPlay() {
    cardDisplay.showAnswer();
    playAudio(card);
}
function evaluateAndSave(mark) {
    console.log(mark);
    // evaluate
    // save
    nextCycle();
}  

export { nextCycle, card };
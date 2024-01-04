import { ref } from "vue";
import { learnStages, directions, marks } from "./enums";
import nextCard from "./nextCard";
import { changeShow as cardDisplay } from "./displayControls";
import { change as buttons } from './buttonsControls.js';
import playAudio from "./playAudio";
import evaluateAndSave from './evaluateAndSave';

const card = ref({});
const ended = ref(false);

function endSession() {
    ended.value = true;
}

function nextCycle() {
    cardDisplay.hideEverything();
    buttons.singleButton();
  
    card.value = nextCard();
    if(!card.value) {
        endSession();
        return;
    }
  
    if(card.value[`${card.value.direction}Autorepeat`]) {
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

    // card.value.autorepeated = true; // adds black border
    card.value.learnStage = learnStages.AUTOREPEAT;
    evaluateAndSave(card);

    buttons.setAction(nextCycle);
}

// recognition //-----------------------------------------
function recognition() {
    cardDisplay.showWriting();
    card.value.recogMark = marks.QUESTION;
    buttons.setAction(recognitionAnswer);
}
  
function recognitionAnswer() {
    showAnswerAndPlay();
    buttons.twoButtons();
    buttons.setAction(evaluateSaveNext);
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
    buttons.setAction(evaluateSaveNext);
}

// common //-----------------------------------------
function showAnswerAndPlay() {
    cardDisplay.showAnswer();
    playAudio(card);
}
function evaluateSaveNext(mark) {
    console.log(mark);
    card.value.mark = mark;

    evaluateAndSave(card);
    
    nextCycle();
}  

export { nextCycle, card, ended };
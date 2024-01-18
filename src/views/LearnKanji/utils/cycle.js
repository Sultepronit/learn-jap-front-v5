import { ref } from "vue";
import { repeatStages, marks } from "./enums";
import nextCard from "./nextCard";
import linksToLists from './linksToLists';
// import { changeShow as cardDisplay } from "./displayControls";
// import { change as buttons } from './buttonsControls.js';
// import playAudio from "./playAudio";
// import evaluateAndSave from './evaluateAndSave';

const card = ref({});
const ended = ref(false);

function endSession() {
    ended.value = true;
    localStorage.clear();
}

function nextCycle() {
    // cardDisplay.hideEverything();
    // buttons.singleButton();
  
    card.value = nextCard();
    if(!card.value) {
        endSession();
        return;
    }
  
    if(card.value.autorepeat) {
        console.log('autorepeat!');
        autorepeat();
    } else {
        // question();
        linksToLists(card.value);
    }    
}


// autorepeat //-----------------------------------------
function autorepeat() {
    nextCycle();
}

// // learn/confrim/repeat //-----------------------------------------
// function question() {
//     if(card.value.direction === directions.FORWARD) {
//         cardDisplay.showWriting();
//         buttons.setAction(showReading)
//     } else {
//         cardDisplay.showTranslation();
//         buttons.setAction(answer);
//     }
// }

// function showReading() {
//     cardDisplay.showReading();

//     if(card.value.learnStage === learnStages.LEARN) {
//         buttons.twoButtons();
//     } else {
//         buttons.threeButtons();
//     }
//     buttons.setAction(quickRecognition);
// }

// function quickRecognition(mark) {
//     answer();
//     card.value.recogMark = mark;
// }

// function answer() {
//     showAnswerAndPlay();

//     if(card.value.learnStage === learnStages.LEARN) {
//         buttons.twoButtons();
//     } else {
//         buttons.threeButtons();
//     }
//     buttons.setAction(evaluateSaveNext);
// }

// // common //-----------------------------------------
// function showAnswerAndPlay() {
//     cardDisplay.showAnswer();
//     playAudio();
// }
// function evaluateSaveNext(mark) {
//     console.log(mark);
//     card.value.mark = mark;

//     evaluateAndSave(card);
    
//     nextCycle();
// }

export { nextCycle, card, ended };
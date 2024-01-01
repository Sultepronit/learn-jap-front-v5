import { ref } from 'vue';
import { directions, learnStages, marks } from "./enums";
import { returnCard, repeatOneMore } from './nextCard';

const progress = ref({
    learn: {
      good: 0,
      bad: 0,
      neutral: 0,
      upgraded: 0
    },
    confirm: {
      good: 0,
      bad: 0,
      neutral: 0,
      upgraded: 0,
      degraded: 0
    },
    repeat: {
      good: 0,
      autoGood: 0,
      bad: 0,
      neutral: 0,
      upgraded: 0,
      autoUpgraded: 0,
      degraded: 0
    }
  });

function basicIncrement(card) {
    progress.value[card.learnStage][card.mark.name]++;
    console.log(progress.value[card.learnStage]);

    card[card.direction+'Progress'] += card.mark.increment;

    if(card.direction === directions.FORWARD) {
        const recogMark
            = card.recogMark.name === marks.GOOD.name || card.recogMark.name === card.mark.name
                ? card.mark : marks.BAD;

        card.fStats = recogMark.increment >= 0
            ? card.fStats + recogMark.increment
                : card.learnStage === learnStages.REPEAT ? -1 : 0;
    }
}

const evaluations = {    
    learn(card) {
        basicIncrement(card);
            // degrade
        if(card.fProgress < -1 && card.mark.name === marks.GOOD.name) {
            card.fProgress = 1;
        } else if(card.bProgress < -1) {
            card.fProgress = 0;
            card.bProgress = 0;
        }
            // return
        if(card.mark.name === marks.BAD.name) {
            returnCard(card);
            return;
        }
            // upgrade
        if(card.fProgress > 0 && card.bProgress > 0 && card.fStats > 0) {
            card.learnStatus = 1;
            card.fProgress = 0;
            card.bProgress = 0;
        }
    },
    confirm(card) {
        basicIncrement(card);
            // degrade
        if(card.fProgress < -1 || card.bProgress < -1) {
            card.learnStatus = 0;
            card.fProgress = 0;
            card.bProgress = 0;
            return;
        }
            // upgrade
        if(card.fProgress > 0 && card.bProgress > 0 && card.fStats > 0) {
            card.learnStatus = 2;
            card.fProgress = 0;
            card.bProgress = 0;
            card.fStats = 1;
        }
    },
    repeat(card) {
        basicIncrement(card);
            // degrade
        if(card.fProgress < -1 || card.bProgress < -1) {
            card.learnStatus = 0;
            card.fProgress = 0;
            card.bProgress = 0;
            card.fStats = 0;
            card.bStats = 0;
            card.fAutorepeat = 0;
            card.bAutorepeat = 0;
            return;
        }
            // degrade a little
        if(card.mark.name === marks.BAD.name && card.direction === directions.BACKWARD) {
            card.bStats = -1;
            return;
        }
            // upgrade
        if(card.fProgress > 0 && card.bProgress > 0) {
            card.learnStatus = 33; // to be changed on server's side
            card.fProgress = 0;
            card.bProgress = 0;
            card.bStats++;
            if(card.fStats > 2) {
                card.fAutorepeat = 1;
            }
            if(card.bStats > 1) {
                card.bAutorepeat = 1;
            }
        }
    },
    recognize(card) {
        card.fStats += card.mark.increment;
        if(card.fStats < -1 && card.mark.name === marks.GOOD.name) {
            card.fStats = 1;
        }
    },
    autorepeat(card) {
        repeatOneMore();
        card[`${card.direction}Autorepeat`] = 0;
        if(card.direction === directions.FORWARD) {
            card.fProgress = 1;
        } else {
            card.learnStatus = 33; // to be changed on server's side
            card.fProgress = 0;
        }
    }
};

function evaluateAndSave(cardArg) {
    const card = { ...cardArg.value };
    const freezed = { ...cardArg.value };
    // const freezed = JSON.parse(JSON.stringify(cardArg.value));
    // const card = { ...freezed };
    // console.log(card);
    console.log(freezed);
    
    evaluations[card.learnStage](card);    

    for(const key in card) {
        // console.log(key);
        if(card[key] === freezed[key]) {
            delete card[key];
        }
    }
    console.log(card);
}

export default evaluateAndSave;
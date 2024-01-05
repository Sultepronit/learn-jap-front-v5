import { saveSession } from "../services/backup";
import update from "../services/update";
import { directions, learnStages, marks } from "./enums";
import { returnCard, repeatOneMore } from './nextCard';
import progress from './progress';

function basicIncrement(card) {
    progress.value[card.learnStage][card.mark.name]++;
    // console.log(progress.value[card.learnStage]);

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
            card.fProgress = -1;
        } else if(card.bProgress < -1) {
            card.fProgress = 0;
            card.bProgress = 0;
        }
            // return
        if(card.mark.name === marks.BAD.name) {
            returnCard(card);
            progress.value.cards--;
            return;
        }
            // upgrade
        if(card.fProgress > 0 && card.bProgress > 0 && card.fStats > 0) {
            progress.value.learn.upgraded++;
            card.learnStatus = 1;
            card.fProgress = 0;
            card.bProgress = 0;
        }
    },
    confirm(card) {
        basicIncrement(card);
            // degrade
        if(card.fProgress < -1 || card.bProgress < -1) {
            progress.value.confirm.degraded++;
            card.learnStatus = 0;
            card.fProgress = 0;
            card.bProgress = 0;
            return;
        }
            // upgrade
        if(card.fProgress > 0 && card.bProgress > 0 && card.fStats > 0) {
            progress.value.confirm.upgraded++;
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
            progress.value.repeat.degraded++;
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
            progress.value.repeat.upgraded++;
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
            card.fStats = -1;
        }
    },
    autorepeat(card) {
        repeatOneMore();
        progress.value.cards--;

        card[`${card.direction}Autorepeat`] = 0;
        progress.value.repeat.autoGood++;

        if(card.direction === directions.FORWARD) {
            card.fProgress = 1;
        } else {
            progress.value.repeat.autoUpgraded++;
            card.learnStatus = 33; // to be changed on server's side
            card.fProgress = 0;
        }
    }
};

function evaluateAndSave(cardArg) {
    progress.value.cards++;

    const card = { ...cardArg.value };
    const freezed = { ...cardArg.value };
    
    evaluations[card.learnStage](card);    

    const changes = {};
    for(const key in card) {
        if(card[key] !== freezed[key]) {
            changes[key] = card[key];
        }
    }

    saveSession();

    console.log(changes);
    // console.log('not saved!');
    if(Object.keys(changes).length > 0) {
        update(card.id, changes);
    }
}

export default evaluateAndSave;
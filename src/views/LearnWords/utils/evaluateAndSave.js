import { saveSession } from "../services/backup";
// import update from "../services/update";
import { patch } from "@/services/commonAPI";
import { directions, marks } from "./enums";
import { returnCard } from './nextCard';
import progress from './progress';

function basicIncrement(card) {
    progress.value[card.learnStage][card.mark]++;

    if(card.mark === marks.GOOD) {
        card[card.direction+'Progress'] = 1;
    } else {
        card[card.direction+'Progress']--;
    }
}

const evaluations = {    
    learn(card) {
        basicIncrement(card);

        // degrade
        if(card.mark === marks.BAD) {
            card.fProgress = 0;
            card.bProgress = 0;
        }
        // return
        if(card.mark === marks.RETURN || card.mark === marks.BAD) {
            returnCard(card);
            progress.value.cards--;
            return;
        }
        // upgrade
        if(card.fProgress > 0 && card.bProgress > 0) {
            progress.value.learn.upgraded++;
            card.learnStatus = 1;
            card.fProgress = 0;
            card.bProgress = 0;
        }
    },
    confirm(card) {
        basicIncrement(card);

        // degrade
        if(card.mark === marks.BAD) {
            card.learnStatus = 0;
            card.fProgress = 0;
            card.bProgress = 0;
            return;
        }
        // upgrade
        if(card.fProgress > 0 && card.bProgress > 0) {
            progress.value.confirm.upgraded++;
            card.learnStatus = 2;
            card.fProgress = 0;
            card.bProgress = 0;
        }
    },
    repeat(card) {
        basicIncrement(card);

        // degrade
        if(card.mark === marks.BAD) {
            card.learnStatus = 0;
            card.fProgress = 0;
            card.bProgress = 0;
            card.fStats = 0;
            card.bStats = 0;
            card.fAutorepeat = 0;
            card.bAutorepeat = 0;
            return;
        }
        // degrade stats
        if(card.mark === marks.NEUTRAL || card.mark === marks.RETURN) {
            card[card.direction+'Stats'] = -1;
        }
        // if(card.recogMark === marks.BAD) {
        //     card.fStats = -1;
        // }
        // improve fStats 
        // if(card.fStats < 0 && card.recogMark === marks.GOOD) {
        //     card.fStats = 0;
        // }
        // return
        if(card.mark === marks.RETURN) {
            returnCard(card);
            progress.value.cards--;
        }
        // upgrade
        if(card.fProgress > 0 && card.bProgress > 0) {
            progress.value.repeat.upgraded++;
            card.learnStatus = 33; // to be changed on server's side
            card.fProgress = 0;
            card.bProgress = 0;

            card.fStats++;
            card.bStats++;

            if(card.fStats > 1) {
                card.fAutorepeat = 1;
            }
            if(card.bStats > 1) {
                card.bAutorepeat = 1;
            }
        }
    },
    remember(card) {
        basicIncrement(card);
        
        if(card.mark === marks.RETURN) {
            returnCard(card);
            progress.value.cards--;
        }
    },
    recognize(card) {
        if(card.mark === marks.BAD) {
            card.fStats--;
        } else {
            card.fStats = 1;
        }
    },
    autorepeat(card) {
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
    // return;
    if(Object.keys(changes).length > 0) {
        // update(card.id, changes);
        patch('words', {id: card.id, changes});
    }
}

export default evaluateAndSave;
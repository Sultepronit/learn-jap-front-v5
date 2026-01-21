import { saveSession } from "../services/backup";
import { update } from "@/services/commonAPI";
import { directions, marks } from "./enums";
import { returnCard } from './nextCard';
import progress from './progress';

function basicIncrement(card) {
    progress.value[card.repeatStage][card.mark]++;

    if(card.mark === marks.GOOD) {
        card[card.direction+'Progress'] = 1;
    } else {
        card[card.direction+'Progress']--;
    }
}

function nullyfyCard(card) {
    card.repeatStatus = 0;
    card.fProgress = 0;
    card.bProgress = 0;
    card.fRecord = 0;
    card.bRecord = 0;
    card.fAutorepeat = 0;
    card.bAutorepeat = 0;
}

const evaluations = {    
    learn(card) {
        basicIncrement(card);

        // degrade
        if(card.mark === marks.BAD) {
            card.repeatStatus = -2;
            card.fProgress = 0;
            card.bProgress = 0;
            return;
        }
        // return
        // if(card.mark === marks.RETURN || card.mark === marks.BAD) {
        if(card.mark === marks.RETURN) {
            returnCard(card);
            progress.value.cards--;
            return;
        }
        // upgrade
        if(card.fProgress > 0 && card.bProgress > 0) {
            progress.value.learn.upgraded++;
            card.repeatStatus = 1;
            card.fProgress = 0;
            card.bProgress = 0;
        }
    },
    confirm(card) { // REMOVE?
        basicIncrement(card);

        // degrade
        if(card.mark === marks.BAD) {
            card.repeatStatus = 0;
            card.fProgress = 0;
            card.bProgress = 0;
            return;
        }
        // return
        if(card.mark === marks.RETURN) {
            returnCard(card);
            progress.value.cards--;
            return;
        }
        // upgrade
        if(card.fProgress > 0 && card.bProgress > 0) {
            progress.value.confirm.upgraded++;
            card.repeatStatus = 2;
            card.fProgress = 0;
            card.bProgress = 0;
        }
    },
    repeat(card) {
        basicIncrement(card);

        // degrade
        if(card.mark === marks.BAD) {
            nullyfyCard(card);
            return;
        }

        // return
        if(card.mark === marks.RETURN) {
            returnCard(card);
            progress.value.cards--;
        }

        // degrade record
        if(card.mark === marks.NEUTRAL || card.mark === marks.RETURN) {
            card[card.direction+'Record'] = -1;
            return;
        }

        // upgrade fRecord
        // if(card.mark === marks.GOOD && card.direction === directions.FORWARD) {
        //     card.fRecord++;
        //     if(card.fRecord > 1) {
        //         card.fAutorepeat = 1;
        //     }
        // }

        // upgrade record
        if(card.mark === marks.GOOD) {
            card[`${card.direction}Record`]++;
            if(card[`${card.direction}Record`] > 1) {
                card[`${card.direction}Autorepeat`] = 1;
            }
        }

        // upgrade
        if(card.fProgress > 0 && card.bProgress > 0) {
            progress.value.repeat.upgraded++;
            card.repeatStatus = 33; // to be changed on server's side
            card.fProgress = 0;
            card.bProgress = 0;

            // card.bRecord++;

            // if(card.bRecord > 1) {
            //     card.bAutorepeat = 1;
            // }
        }
    },
    remember(card) { // no need maybe?
        basicIncrement(card);
        
        // return
        if(card.mark === marks.RETURN) {
            returnCard(card);
            progress.value.cards--;
            return;
        }

        // degrade
        if(card.mark === marks.BAD) {
            nullyfyCard(card);
            progress.value.repeat.bad++;
            // return;
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
            card.repeatStatus = 33; // to be changed on server's side
            card.fProgress = 0;
        }
    }
};

function evaluateAndSave(cardArg) {
    progress.value.cards++;

    const card = { ...cardArg.value };
    const freezed = { ...cardArg.value };
    
    evaluations[card.repeatStage](card);    

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
        update('words', {id: card.id, changes});
    }
}

export default evaluateAndSave;
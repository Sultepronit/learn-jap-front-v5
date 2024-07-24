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
            card.repeatStatus = 1;
            card.fProgress = 0;
            card.bProgress = 0;
        }
    },
    confirm(card) {
        basicIncrement(card);

        // degrade
        if(card.mark === marks.BAD) {
            card.repeatStatus = 0;
            card.fProgress = 0;
            card.bProgress = 0;
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
            card.repeatStatus = 0;
            card.fProgress = 0;
            card.bProgress = 0;
            card.fRecord = 0;
            card.bRecord = 0;
            card.fAutorepeat = 0;
            card.bAutorepeat = 0;
            return;
        }
        // degrade stats
        if(card.mark === marks.NEUTRAL || card.mark === marks.RETURN) {
            card[card.direction+'Stats'] = -1;
        }
        // return
        if(card.mark === marks.RETURN) {
            returnCard(card);
            progress.value.cards--;
        }
        //
        if(card.mark === marks.GOOD && card.direction === directions.FORWARD) {
            card.fRecord++;
            if(card.fRecord > 1) {
                card.fAutorepeat = 1;
            }
        }
        // upgrade
        if(card.fProgress > 0 && card.bProgress > 0) {
            progress.value.repeat.upgraded++;
            card.repeatStatus = 33; // to be changed on server's side
            card.fProgress = 0;
            card.bProgress = 0;

            card.bRecord++;

            if(card.bRecord > 1) {
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
    // recognize(card) {
    //     if(card.mark === marks.BAD) {
    //         card.fRecord--;
    //     } else {
    //         card.fRecord = 0;
    //     }
    // },
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
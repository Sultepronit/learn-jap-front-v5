import { saveSession } from '../services/backup';
import { patch, update } from '@/services/commonAPI.js';
import { marks, repeatStages } from './enums';
import { returnCard } from './nextCard';
import progress from './progress';

function evaluation(card) {
    progress.value[card.repeatStage][card.mark]++;

    // if(card.mark === marks.AUTOREPEAT) {
    //     card.autorepeat = 0;
    //     card.repeatStatus = 33; // to be changed on server's side
    //     repeatOneMore();
    //     return;
    // }

    progress.value.cards++;

    if(card.mark === marks.NEUTRAL || card.mark === marks.RETURN) {
        card.progress--;
    }

    if(card.repeatStage === repeatStages.LEARN) {
        if(card.mark === marks.GOOD) {
            card.progress = 0;
            card.repeatStatus = 1;
        } else if(card.mark === marks.BAD) {
            card.progress = 0;
            progress.value.cards--;
            returnCard(card);
        }
        // return;
    }
    
    if(card.repeatStage === repeatStages.REPEAT) {
        if(card.mark === marks.BEST) {
            card.autorepeat = 1;
        }

        if(card.mark === marks.GOOD || card.mark === marks.BEST) { // upgrade
            card.progress = 0;
            card.record++;
            card.repeatStatus = 33; // to be changed on server's side
        } else {
            card.record = -1;

            if(card.mark === marks.BAD) { // degrade
                card.repeatStatus = 0;
                card.progress = 0;
            }
        }
    }

    if(card.mark === marks.RETURN) {
        progress.value.cards--;
        returnCard(card);
    }
}

function evaluateAndSave(cardArg) {
    const card = { ...cardArg.value };
    const frozen = { ...cardArg.value };

    evaluation(card);
    // console.log(progress.value);

    const changes = {};
    for(const key in card) {
        if(card[key] !== frozen[key]) {
            changes[key] = card[key];
        }
    }

    saveSession();

    console.log(changes);
    // console.log('not saved!');
    // return;

    if(Object.keys(changes).length > 0) {
        // patch('kanji', { id: card.id, changes });
        update('kanji', { id: card.id, changes });
    }
}

export default evaluateAndSave;
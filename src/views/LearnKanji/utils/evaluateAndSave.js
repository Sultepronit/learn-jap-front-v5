// import { saveSession } from "../services/backup";
// import update from "../services/update";
import { marks } from "./enums";
import { returnCard, repeatOneMore } from './nextCard';
import progress from './progress';

function evaluation(card) {
    progress.value[card.mark.name]++;

    if(card.mark.is(marks.AUTOREPEAT)) {
        card.autorepeat = 0;
        card.repeatStatus = 33; // to be changed on server's side
        repeatOneMore();
        return;
    }

    progress.value.cards++;
    
    if(card.progress < 0) {
        progress.problemCards++;
    }

    card.progress += card.mark.increment;

    if(card.mark.is(marks.BAD)) {
        card.record = -1;
        returnCard(card);
        return;
    }

    if(card.progress < -1 && card.mark.is(marks.GOOD)) {
        card.progress = -1;
        return;
    }

    if(card.progress > 1) {
        progress.value.upgraded++;
        card.progress = 0;
        card.record++;
        card.repeatStatus = 33; // to be changed on server's side
    }

    if(card.mark.is(marks.BEST)) {
        card.autorepeat = 1;
    }
}

function evaluateAndSave(cardArg) {
    const card = { ...cardArg.value };
    const freezed = { ...cardArg.value };

    evaluation(card);
    // console.log(progress.value);

    const changes = {};
    for(const key in card) {
        if(card[key] !== freezed[key]) {
            changes[key] = card[key];
        }
    }

    // saveSession();

    console.log(changes);
    console.log('not saved!');
    // if(Object.keys(changes).length > 0) {
    //     update(card.id, changes);
    // }
}

export default evaluateAndSave;
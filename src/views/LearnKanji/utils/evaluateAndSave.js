// import { saveSession } from "../services/backup";
// import update from "../services/update";
// import { directions, learnStages, marks } from "./enums";
// import { returnCard, repeatOneMore } from './nextCard';
// import progress from './progress';

function evaluateAndSave(cardArg) {
    // progress.value.cards++;

    const card = { ...cardArg.value };
    const freezed = { ...cardArg.value };
    
    card.progress += card.mark.increment;

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
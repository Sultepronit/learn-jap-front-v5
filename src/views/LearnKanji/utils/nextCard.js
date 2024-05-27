// import { pullRandomElement } from '@/utils/random';
import { repeatStages } from './enums';
import { session } from '../services/data';

function nextCard() {
    if(session.length < 1) {
        return null;
    }

    let card = session.shift();

    console.log(session);
    console.log(card);
    return card;
}

function returnCard(card) {
    console.log('I\'ll be back!');

    lists.repeatStageList.push(repeatStages.REMEMBER);
    // console.log(lists.repeatStageList);

    lists.rememberList.push(card);
    console.log(lists.rememberList);
}

export default nextCard;
export { returnCard };
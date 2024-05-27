import { pullRandomElement } from '@/utils/random';
import { repeatStages } from './enums';
import { lists } from '../services/data';

function nextCard() {
    // const { repeatList, problemList, repeatStageList } = lists;
    const { repeatStageList, learnList, repeatList, rememberList } = lists;

    if(repeatStageList.length < 1) {
        return null;
    }

    const repeatStage = pullRandomElement(repeatStageList);
    console.log(repeatStage);
    console.log(repeatStageList);

    let card =
        repeatStage === repeatStages.REPEAT ? pullRandomElement(repeatList)
        : repeatStage === repeatStages.LEARN ? pullRandomElement(learnList)
        : pullRandomElement(rememberList);

    while(card.links === '[]') {
        card = pullRandomElement(repeatList);
    }

    card.repeatStage = repeatStage;

    console.log(card);
    return card;
}

function repeatOneMore() {
    console.log('repeat more!');
    lists.repeatStageList.push(repeatStages.REPEAT);
    console.log(lists.repeatStageList);
}

function returnCard(card) {
    console.log('I\'ll be back!');

    lists.repeatStageList.push(repeatStages.REMEMBER);
    // console.log(lists.repeatStageList);

    lists.rememberList.push(card);
    console.log(lists.rememberList);
}

export default nextCard;
export { returnCard, repeatOneMore };
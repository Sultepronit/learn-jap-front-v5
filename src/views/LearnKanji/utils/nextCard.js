import { pullRandomElement } from '@/utils/random';
import { repeatStages } from './enums';
import { lists } from '../services/data';
// import linksToLists from './linksToLists';

function nextCard() {
    const { repeatList, problemList, repeatStageList } = lists;

    if(repeatStageList.length < 1) {
        return null;
    }

    const repeatStage = pullRandomElement(repeatStageList);
    console.log(repeatStage);
    console.log(repeatStageList);

    let card = repeatStage === repeatStages.REPEAT
        ? pullRandomElement(repeatList) : pullRandomElement(problemList);

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

    lists.repeatStageList.push(repeatStages.PROBLEM);
    console.log(lists.repeatStageList);

    lists.problemList.push(card);
    console.log(lists.problemList);
}

export default nextCard;
export { returnCard, repeatOneMore };
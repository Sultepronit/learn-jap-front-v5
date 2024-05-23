import { ref } from 'vue';
import { kanji as kanjiMap } from '../services/data.js';
import linksToLists from '@/utils/linksToLists.js';

const selectedKanji = ref(null);
const previousCases = {};

function getKanjiList(card) {
    if(card.kanjis) return;

    const unique = new Set();
    for(const char of (card.writings + card.rareWritings)) {
        if(char < 'ー') continue;
        unique.add(char);
    }
    card.kanjis = Array.from(unique);
}

function removeTheWord(kanjiCard, wordNumber) {
    console.log('remove word');
    let result = {};
    result.wordList = kanjiCard.wordList.filter(art => art.articleNumber != wordNumber);
    result.otherList = kanjiCard.otherList.filter(art => art.articleNumber != wordNumber);

    return result;
}

function getWordsList(kanji) {
    console.log('get lists');
    const kanjiCard = kanjiMap[kanji];
    if(!kanjiCard) return;
    
    linksToLists(kanjiCard);
    // console.log(kanjiCard);

    return kanjiCard;
}

function selectKanji(kanji, wordNumber) {
    if(previousCases[kanji]) {
        selectedKanji.value
            = previousCases[kanji][wordNumber] // if there was the kanji & the word
            || removeTheWord(previousCases[kanji].initialList, wordNumber); // it there was the kanji in other word(s)
    } else {
        const initialList = getWordsList(kanji);
        if(!initialList) return;

        previousCases[kanji] = { initialList }; // for other words with the kanji
        previousCases[kanji][wordNumber] = removeTheWord(initialList, wordNumber); // for other times the kanji is selected
        
        selectedKanji.value = previousCases[kanji][wordNumber];
    }
    console.log(previousCases);
}

export { getKanjiList, selectKanji, selectedKanji };
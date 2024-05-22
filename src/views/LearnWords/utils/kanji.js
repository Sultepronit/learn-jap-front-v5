import { ref } from 'vue';
import { kanji as kanjiMap } from '../services/data.js';
import linksToLists from '@/utils/linksToLists.js';

const selectedKanji = ref(null);

function getKanjiList(card) {
    const unique = new Set();
    for(const char of (card.writings + card.rareWritings)) {
        if(char < 'ー') continue;
        unique.add(char);
    }
    card.parsed.kanjis = Array.from(unique);
}

function removeTheWord(json, wordNumber) {
    return JSON.stringify(
        JSON.parse(json).filter(number => number != wordNumber)
    );
}

function getWordsList(kanji, wordNumber) {
    console.log(kanji, wordNumber);
    const kanjiCard = kanjiMap[kanji];
    if(!kanjiCard) return;
 
    kanjiCard.links = removeTheWord(kanjiCard.links, wordNumber);
    kanjiCard.otherLinks = removeTheWord(kanjiCard.otherLinks, wordNumber);
    
    linksToLists(kanjiCard);
    console.log(kanjiCard);

    selectedKanji.value = kanjiCard;
    console.log(selectedKanji.value);
}

export { getKanjiList, getWordsList, selectedKanji };
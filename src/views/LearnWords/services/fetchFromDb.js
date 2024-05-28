import { get } from "@/services/commonAPI.js";

async function fetchData() {
    const data = await get('/session/words-ready');
    console.log(data);

    return data;
}

async function getKanjiForWords() {
    const data = await get('/session/kanji-for-words');
    if(!data) return;

    localStorage.setItem('kanjiForWords', JSON.stringify(data));
    
    return data;
}

export { fetchData, getKanjiForWords };
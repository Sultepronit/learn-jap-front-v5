import { ref } from 'vue';
import { get } from '@/services/commonAPI.js';
import { repeatStages } from '../utils/enums';

let lists = {};
let words = {};
let sessionLength = 0;
const ready = ref(false);

async function fetchData() {
    const data = await get('kanji_session');
    console.log(data);
    const { repeatList, problemList } = data;
    sessionLength = data.sessionLength;
    words = data.words;

    const repeatStageList = Array(sessionLength)
        .fill(repeatStages.PROBLEM, 0, problemList.length)
        .fill(repeatStages.REPEAT, problemList.length);
    console.log(repeatStageList);

    lists = { repeatList, problemList, repeatStageList };
}

async function startSession() {
    // const restored = await restoreSession();
    const restored = false;
    if(restored) {
        //
    } else {
        await fetchData();
    }
    
    // console.log(lists);
    ready.value = true;
}

export { startSession, ready, sessionLength, lists, words };

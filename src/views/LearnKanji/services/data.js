import { get } from "@/services/commonAPI.js";
import { pullRandomElement } from "@/utils/random";

async function fetchData() {
    const data = await get('kanji_session');
    console.log(data);

    const { repeatList, words } = data;
    const card = pullRandomElement(repeatList);
    
    card.links = JSON.parse(card.links);

    console.log(card);
    
    for(const link of card.links) {
        console.log(words[link - 1]);
    }
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
    // ready.value = true;
}

export { startSession };

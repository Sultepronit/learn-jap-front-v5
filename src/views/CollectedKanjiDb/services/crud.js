import { ref } from "vue";
import { get } from "@/services/commonAPI.js";

const db = ref([]);
const ready = ref(false);

function startSession() {
    // dev mode
    const restored = JSON.parse(localStorage.getItem('kanjiDb'));
    if(restored) {
        db.value = restored;
        console.log('restored!', restored);
        ready.value = true;
        return;
    }

    get('/table/kanji').then((data) => {
        db.value = data;
        ready.value = true;

        localStorage.setItem('kanjiDb', JSON.stringify(data)); // for the dev mode
    });
}

// const numberToSelect = ref(0);

export {
    startSession,
    db,
    ready,
    // numberToSelect,
};
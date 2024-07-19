import { ref } from "vue";
import { get, post, update, deleteApi } from "@/services/commonAPI.js";

const db = ref([]);
const ready = ref(false);

function startSession() {
    // dev mode
    // const restored = JSON.parse(localStorage.getItem('wordsDb'));
    // if(restored) {
    //     db.value = restored;
    //     console.log(restored);
    //     // setTimeout(() => ready.value = true, 1000);
    //     ready.value = true;
    //     return;
    // }

    get('/table/words').then((data) => {
        db.value = data;
        ready.value = true;

        // localStorage.setItem('wordsDb', JSON.stringify(data)); // for the dev mode
    });
}

function refetch() {
    db.value = [];
    startSession();
}

async function createNewCard() {
    const newCard = await post('words', { cardNumber: db.value.length + 1 });
    db.value.push(newCard);
}

async function updateCard(cardNumber, field, value) {
    const editedCard = db.value[cardNumber - 1];
    editedCard[field] = value;

    const data = {
        id: editedCard.id,
        changes: {}
    }
    data.changes[field] = value;

    await update('words', data);
}

async function deleteCard(cardNumber) {
    if(!confirm(`Do you confrim deleting this card?`)) return;

    const id = db.value[cardNumber - 1].id;
    const success = await deleteApi('words', id);
    if(success) {
        refetch();
    }
}

export {
    startSession,
    refetch,
    db,
    ready,
    createNewCard,
    updateCard as update,
    deleteCard
};
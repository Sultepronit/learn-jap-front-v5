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

        localStorage.setItem('wordsDb', JSON.stringify(data)); // for the dev mode
    });
}

function refetch() {
    db.value = [];
    startSession();
}

const isSaving = ref(false);

const numberToSelect = ref(0);

async function createNewCard() {
    try {
        isSaving.value = true;

        const newCardNumber = { cardNumber: db.value.length + 1 };
        const newCard = await post('words', newCardNumber);

        db.value.push(newCard);
        numberToSelect.value = newCard.cardNumber;

        isSaving.value = false;
    } catch(e) {
        console.error(e);
    }
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
    const confirmation = confirm(`Do you confrim deleting this card?`);
    if(!confirmation) {
        return;
    }

    isSaving.value = true;

    const id = db.value[cardNumber - 1].id;
    const success = await deleteApi('words', id);
    if(success) {
        // location.reload();
        refetch();
        isSaving.value = false;
    }
}

export {
    startSession,
    refetch,
    db,
    ready,
    numberToSelect,
    isSaving,
    createNewCard,
    updateCard as update,
    deleteCard
};
import { ref } from "vue";
import { get, post, patch, deleteApi } from "@/services/commonAPI.js";

const db = ref([]);
const ready = ref(false);

function startSession() {
    get('jap').then((data) => {
        db.value = data;
        ready.value = true;
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
        const newCard = await post('jap', newCardNumber);
        db.value.push(newCard);
        numberToSelect.value = newCard.cardNumber;
        // console.log(newCard);
        isSaving.value = false;
    } catch(e) {
        console.error(e);
    }
}

async function update(cardNumber, field, value) {
    isSaving.value = true;

    const editedCard = db.value[cardNumber - 1];
    editedCard[field] = value;

    const data = {
        id: editedCard.id,
        changes: {}
    }
    data.changes[field] = value;

    const success = await patch('jap', data);
    if(success) {
        isSaving.value = false;
    }
}

async function deleteCard(cardNumber) {
    const confirmation = confirm(`Do you confrim deleating this card?`);
    if(!confirmation) {
        return;
    }
    isSaving.value = true;
    try {
        const id = db.value[cardNumber - 1].id;
        const success = await deleteApi('jap', id);
        if(success) {
            location.reload();
            isSaving.value = false;
        } else {
            // alert('Not deleted!');
        }
    } catch(e) {
        console.error(e);
        // alert('Error!');
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
    update,
    deleteCard
};
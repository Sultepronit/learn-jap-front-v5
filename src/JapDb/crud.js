import { ref } from "vue";
import startSession from "./startSession.js";
import post from "@/api/post";
import patch from "@/api/patch.js";
import deleteAPI from "@/api/deleteAPI";
// import { select } from './displaySelect.js';

console.time('tt');

const db = ref([]);
const ready = ref(false);
startSession().then((data) => {
    db.value = data;
    ready.value = true;
});


const isSaving = ref(false);

const numberToSelect = ref(0);

async function createNewCard() {
    try {
        isSaving.value = true;
        const newCard = await post(db.value.length + 1);
        db.value.push(newCard);
        // select(newCard.cardNumber, true);
        numberToSelect.value = newCard.cardNumber;

        // console.log(db.value);
        // console.log(newCard);
        isSaving.value = false;
    } catch(e) {
        console.error(e);
    }
}

function update(cardNumber, field, value) {
    console.log('saving...');
    isSaving.value = true;

    const editedCard = db.value[cardNumber - 1];
    editedCard[field] = value;

    // console.log(cardNumber, field, value);
    // console.log(editedCard);

    const data = {
        id: editedCard.id,
        changes: {}
    }
    data.changes[field] = value;

    patch(data).then((success) => {
        if(success) {
            isSaving.value = false;
        } else {
            // add possibility to try and save again
        }
    });
}

async function deleteCard(cardNumber) {
    const confirmation = confirm(`Do you confrim deleating this card?`);
    if(!confirmation) {
        return;
    }
    isSaving.value = true;
    try {
        const success = await deleteAPI(db.value[cardNumber - 1].id);
        if(success) {
            location.reload();
            isSaving.value = false;
        } else {
            alert('Not deleted!');
        }
    } catch(e) {
        console.error(e);
        alert('Error!');
    }
}

export {
    db,
    ready,
    numberToSelect,
    isSaving,
    createNewCard,
    update,
    deleteCard
};
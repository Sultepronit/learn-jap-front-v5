import deleteAPI from "@/api/deleteAPI";
import post from "@/api/post";

async function createNewCard(isSaving, db, select) {
    try {
        isSaving.value = true;
        const newCard = await post(db.value.length + 1);
        db.value.push(newCard);
        select(newCard.cardNumber, true);

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

    editedCard.value = db.value[cardNumber - 1];
    editedCard.value[field] = value;

    console.log(cardNumber, field, value);
    console.log(editedCard.value);

    const data = {
        id: editedCard.value.id,
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

async function deleteCard(isSaving, selectedCard) {
    const confirmation = confirm(`Do you confrim deleating this card?`);
    if(!confirmation) {
        return;
    }
    isSaving.value = true;
    try {
        const success = await deleteAPI(selectedCard.value.id);
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

export { createNewCard, deleteCard };
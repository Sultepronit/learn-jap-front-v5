import { ref } from 'vue';

const isDisplayed = ref(false);
function showResetButton() {
    isDisplayed.value = true;
    document.addEventListener('click', hideResetButton);
}

function hideResetButton() {
    isDisplayed.value = false;
    document.removeEventListener('click', hideResetButton);
}

export { showResetButton, isDisplayed };
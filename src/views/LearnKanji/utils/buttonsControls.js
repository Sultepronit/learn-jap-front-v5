import { ref } from 'vue';

const params = ref({
    // showCentral: true,
    showSides: false,
    showBest: false,
    action: null
});

const change = {
    singleButton() {
        params.value.showSides = false;
        params.value.showBest = false;
    },
    threeButtons() {
        params.value.showSides = true;
    },
    fourthButton() {
        params.value.showBest = true;
    },
    setAction(fn) {
        params.value.action = fn;
    }
}

export { params, change };
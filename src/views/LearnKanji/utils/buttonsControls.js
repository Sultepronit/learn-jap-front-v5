import { ref } from 'vue';

const params = ref({
    // showCentral: true,
    showSides: false,
    showBest: false,
    showReturn: false,
    action: null
});

const change = {
    singleButton() {
        params.value.showSides = false;
        params.value.showBest = false;
        params.value.showReturn = false;
    },
    twoButtons() {
        params.value.showSides = false;
        params.value.showReturn = true;
    },
    fourButtons() {
        params.value.showSides = true;
        params.value.showReturn = true;
    },
    bestButton() {
        params.value.showBest = true;
    },
    setAction(fn) {
        params.value.action = fn;
    }
}

export { params, change };
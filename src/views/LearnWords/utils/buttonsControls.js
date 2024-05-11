import { ref } from 'vue';

const params = ref({
    showCentral: false,
    showSides: false,
    // showReset: false,
    showReturn: false,
    action: null
});

const change = {
    singleButton() {
        params.value.showCentral = true;
        params.value.showSides = false;
        // params.value.showReset = false;
        params.value.showReturn = false;
    },
    twoButtons() {
        params.value.showCentral = false;
        params.value.showSides = true;
        // params.value.showReset = false;
        params.value.showReturn = false;
    },
    threeButtons() {
        params.value.showCentral = true;
        params.value.showSides = true;
        // params.value.showReset = false;
        params.value.showReturn = false;
    },
    fourButtons() {
        params.value.showCentral = true;
        params.value.showSides = true;
        // params.value.showReset = true;
        params.value.showReturn = true;
    },
    rememberButtons() {
        params.value.showCentral = true;
        params.value.showSides = false;
        params.value.showReturn = true;
    },
    setAction(fn) {
        params.value.action = fn;
    }
}

export { params, change };
import { ref } from 'vue';

const params = ref({
    showCentral: false,
    showSides: false,
    showReset: false,
    action: null
});

const change = {
    singleButton() {
        params.value.showCentral = true;
        params.value.showSides = false;
        params.value.showReset = false;
    },
    twoButtons() {
        params.value.showCentral = false;
        params.value.showSides = true;
        params.value.showReset = false;
    },
    threeButtons() {
        params.value.showCentral = true;
        params.value.showSides = true;
        params.value.showReset = false;
    },
    fourButtons() {
        params.value.showCentral = true;
        params.value.showSides = true;
        params.value.showReset = true;
    },
    setAction(fn) {
        params.value.action = fn;
    }
}

export { params, change };
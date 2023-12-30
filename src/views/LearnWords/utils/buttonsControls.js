import { ref } from 'vue';

const params = ref({
    showCentral: false,
    showSides: false,
    action: null
});

const change = {
    singleButton() {
        params.value.showCentral = true;
        params.value.showSides = false;
    },
    twoButtons() {
        params.value.showCentral = false;
        params.value.showSides = true;
    },
    threeButtons() {
        params.value.showCentral = true;
        params.value.showSides = true;
    },
    setAction(fn) {
        params.value.action = fn;
    }
}

export { params, change };
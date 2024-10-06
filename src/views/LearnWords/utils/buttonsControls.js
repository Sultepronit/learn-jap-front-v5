import { ref } from 'vue';

const params = ref({
    showGood: false,
    showCentral: false,
    showReturn: false,
    showBad: false,
    action: null
});

const change = {
    singleButton() {
        params.value.showGood = false;
        params.value.showCentral = true;
        params.value.showReturn = false;
        params.value.showBad = false;
    },
    goodBad() {
        params.value.showGood = true;
        params.value.showCentral = false;
        params.value.showReturn = false;
        params.value.showBad = true;
    },
    goodPassBad() {
        params.value.showGood = true;
        params.value.showCentral = true;
        params.value.showReturn = false;
        params.value.showBad = true;
    },
    goodReturnBad() {
        params.value.showGood = true;
        params.value.showCentral = false;
        params.value.showReturn = true;
        params.value.showBad = true;
    },
    returnBad() {
        params.value.showGood = false;
        params.value.showCentral = false;
        params.value.showReturn = true;
        params.value.showBad = true;
    },
    passReturn() {
        params.value.showGood = false;
        params.value.showCentral = true;
        params.value.showReturn = true;
        params.value.showBad = true;
    },
    setAction(fn) {
        params.value.action = fn;
    }
}

export { params, change };
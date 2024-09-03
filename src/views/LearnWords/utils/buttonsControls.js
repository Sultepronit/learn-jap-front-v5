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
    twoButtons() {
        params.value.showGood = true;
        params.value.showCentral = false;
        params.value.showReturn = false;
        params.value.showBad = true;
    },
    threeButtons() {
        params.value.showGood = true;
        params.value.showCentral = true;
        params.value.showReturn = false;
        params.value.showBad = true;
    },
    fourButtons() {
        params.value.showGood = true;
        params.value.showCentral = true;
        params.value.showReturn = true;
        params.value.showBad = true;
    },
    notGoodButtons() {
        params.value.showGood = false;
        params.value.showCentral = true;
        params.value.showReturn = true;
        params.value.showBad = true;
    },
    // rememberButtons() {
    //     params.value.showGood = false;
    //     params.value.showCentral = true;
    //     params.value.showReturn = true;
    //     params.value.showBad = false;
    // },
    setAction(fn) {
        params.value.action = fn;
    }
}

export { params, change };
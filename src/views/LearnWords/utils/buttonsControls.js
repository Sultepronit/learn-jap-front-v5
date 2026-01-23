import { ref } from 'vue';

const params = ref({
    showGood: false,
    showCentral: false,
    showReturn: false,
    showBad: false,
    show: {
        good: false,
        pass: false,
        retry: false,
        bad: false
    },
    action: null,
    retryWidth: 6
});

const change = {
    setButtons(good = false, pass = false, retry = false, bad = false) {
        params.value.show.good = good;
        params.value.show.pass = pass;
        params.value.show.retry = retry;
        params.value.show.bad = bad;
    },
    // singleButton() {
    //     params.value.showGood = false;
    //     params.value.showCentral = true;
    //     params.value.showReturn = false;
    //     params.value.showBad = false;
    // },
    // goodBad() {
    //     params.value.showGood = true;
    //     params.value.showCentral = false;
    //     params.value.showReturn = false;
    //     params.value.showBad = true;
    // },
    // goodPassBad() {
    //     params.value.showGood = true;
    //     params.value.showCentral = true;
    //     params.value.showReturn = false;
    //     params.value.showBad = true;
    // },
    // goodReturnBad() {
    //     params.value.showGood = true;
    //     params.value.showCentral = false;
    //     params.value.showReturn = true;
    //     params.value.showBad = true;
    // },
    // returnBad() {
    //     params.value.showGood = false;
    //     params.value.showCentral = false;
    //     params.value.showReturn = true;
    //     params.value.showBad = true;
    // },
    // passReturn() {
    //     params.value.showGood = false;
    //     params.value.showCentral = true;
    //     params.value.showReturn = true;
    //     params.value.showBad = true;
    // },
    setAction(fn) {
        params.value.action = fn;
    },
    setRetry(progress) {
        console.log(progress);
        if (progress < -4) progress = -4;
        params.value.retryWidth = 6 + progress;
    }

}

export { params, change };
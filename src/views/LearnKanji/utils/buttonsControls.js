import { ref } from 'vue';

const params = ref({
    // showCentral: true,
    // showSides: false,
    // showBest: false,
    // showReturn: false,
    show: {
        best: false,
        good: false,
        pass: false,
        retry: false,
        bad: false
    },
    action: null
});

const change = {
    setButtons(best = false, good = false, pass = false, retry = false, bad = false) {
        console.log(good)
        params.value.show.best = best;
        params.value.show.good = good;
        params.value.show.pass = pass;
        params.value.show.retry = retry;
        params.value.show.bad = bad;
    },
    // singleButton() {
    //     params.value.showSides = false;
    //     params.value.showBest = false;
    //     params.value.showReturn = false;
    // },
    // twoButtons() {
    //     params.value.showSides = false;
    //     params.value.showReturn = true;
    // },
    // fourButtons() {
    //     params.value.showSides = true;
    //     params.value.showReturn = true;
    // },
    // bestButton() {
    //     params.value.showBest = true;
    // },
    setAction(fn) {
        params.value.action = fn;
    }
}

export { params, change };
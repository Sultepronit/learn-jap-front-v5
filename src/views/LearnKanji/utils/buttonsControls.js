import { ref } from 'vue';

const params = ref({
    show: {
        best: false,
        good: false,
        pass: false,
        retry: false,
        bad: false
    },
    action: null,
    retryWidth: 5
});

const change = {
    setButtons(best = false, good = false, pass = false, retry = false, bad = false) {
        // console.log(good)
        params.value.show.best = best;
        params.value.show.good = good;
        params.value.show.pass = pass;
        params.value.show.retry = retry;
        params.value.show.bad = bad;
    },
    setAction(fn) {
        params.value.action = fn;
    },
    setRetry(progress) {
        if (progress < -4) progress = -4;
        params.value.retryWidth = 6 + progress;
    }
}

export { params, change };
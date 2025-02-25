import { ref } from 'vue';

const progress = ref({
    cards: 0,

    learn: {
        good: 0,
        bad: 0,
        neutral: 0,
        return: 0,
    },
    repeat: {
        neutral: 0,
        return: 0,
        good: 0,
        best: 0,
        // autorepeat: 0,
        bad: 0
    },
    autorepeat: 0,
    remember: {
        neutral: 0,
        return: 0,
        bad: 0
    }
});

function restoreProgress(restored) {
    progress.value = restored;
}

export default progress;
export { restoreProgress }
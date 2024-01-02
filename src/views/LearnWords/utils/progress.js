import { ref } from 'vue';

const progress = ref({
    cards: 0,
    learn: {
        good: 0,
        bad: 0,
        upgraded: 0
    },
    confirm: {
        good: 0,
        bad: 0,
        neutral: 0,
        upgraded: 0,
        degraded: 0
    },
    repeat: {
        good: 0,
        autoGood: 0,
        bad: 0,
        neutral: 0,
        upgraded: 0,
        autoUpgraded: 0,
        degraded: 0
    }
});

export default progress;
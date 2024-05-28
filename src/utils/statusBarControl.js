import { ref } from 'vue';

const status = ref('');

const setStatus = {
    loading() {
        status.value = 'loading';
    },
    clear() {
        status.value = 'clear';
    },
    failed() {
        status.value = 'failed';
    },
}

export { status, setStatus };
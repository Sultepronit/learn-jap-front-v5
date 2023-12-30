import { ref } from 'vue';

const show = ref({});

const changeShow = {
    hideEverything() {
        show.value = {
            writing: false,
            reading: false,
            translation: false,
            answer: false
        }
    },
    showWriting() {
        show.value.writing = true;
    },
    showTranslation() {
        show.value.translation = true;
    },
    showReading() {
        show.value.reading = true;
    },
    showAnswer() {
        show.value = {
            writing: false,
            reading: false,
            translation: true,
            answer: true
        }
    }
}

export { show, changeShow };
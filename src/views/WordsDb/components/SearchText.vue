<script setup>
import { ref } from 'vue';

defineProps(['setFindTextOptions']);

const findTextOptions = ref({
    query: '',
    inTranslation: false
});
</script>

<template>
<input
    type="text"
    v-model="findTextOptions.query"
    @input="setFindTextOptions(findTextOptions)"
>
<label for="translation">
    <input
        type="checkbox"
        name="translation"
        v-model="findTextOptions.inTranslation"
        @change="setFindTextOptions(findTextOptions)"
    >
    Translation
</label>
</template>

<style scoped>
input {
    font-size: inherit;
    margin: 1px;
    padding-inline: 0.2em;
}
</style>
<script setup>
import { ref } from 'vue';
import startSession from '@/JapDb/startSession';

const db = ref(Array(1000).fill({ id: 1}));
const ready = ref(false);
const topPartIsReady = ref(false);
startSession().then((data) => {
    // db.value = data;
    ready.value = true;

    setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, 50);
    setTimeout(() => {
        topPartIsReady.value = true;
    }, 500);
});




// console.log(db.value);
</script>

<template>
    <table>
        <!-- <tbody v-if="ready"> -->
        <tbody>
            <!-- <tr v-for="row in db.slice(4500)" :key="row.id"> -->
            <tr v-for="row in db" :key="row.id"></tr>
                <td>
                    {{ row.id }}
                </td>
                <!-- <td>
                    <span :class="{'blue': row.altWriting}">{{row.writings}}</span> 
                    <span class="gray">　{{row.rareWritings}}</span>
                </td> -->


                <!-- html += `<td>
                    <spanr>${row.readings}</span> 
                    <span class="gray">${row.rereReadings}</span>
                </td>`;
                html += `<td>
                    ${row.translation.length < 20 ? row.translation
                        : row.translation.substring(0, 20) + '...'}
                </td>`;
                html += `<td>
                    ${row.example.length < 15 ? row.example
                        : row.example.substring(0, 15) + '...'}
                </td>`; -->
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.blue {
    color: blue;
}
.gray {
    color: gray;
}
</style>
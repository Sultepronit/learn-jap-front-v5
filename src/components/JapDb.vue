<script setup>
import { ref } from 'vue';
import startSession from '@/JapDb/startSession';

// const db = ref(Array(1000).fill({ id: 1}));
const db = ref([]);
const ready = ref(false);
const topPartIsReady = ref(false);
startSession().then((data) => {
    db.value = data;
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
        <tbody v-if="ready">
            <!-- <tr v-for="row in db.slice(4500)" :key="row.id"> -->
            <tr
                v-for="row in db"
                :key="row.id"
                @click="console.log(row.id)"
            >
                <td>
                    {{ row.id }}
                </td>
                <td>
                    <div class="cell">
                        <span :class="{'blue': row.altWriting}">{{row.writings}}</span> 
                        <span class="gray">　{{row.rareWritings}}</span>
                    </div>
                </td>
                <td>
                    <div class="cell">
                        <span>{{row.readings}}</span> 
                        <span class="gray">　{{row.rereReadings}}</span>
                    </div>
                </td>
                <td>
                    <div class="cell over-auto" v-html="row.translation" />
                </td>
                <td>
                    <div class="cell" v-html="row.example" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    border-collapse: collapse;
}
tr {
    /* height: 1em; */
    overflow: hidden;
}
td {
    /* overflow: auto; */
    overflow: hidden;
    /* max-width: 10em; */
    /* min-width: 4em;
    max-width: 25%; */
    /* height: 1em; */
    border: 1px solid;
    padding-inline: 0.5em;
}

.cell {
    /* overflow-y: auto; */
    overflow: hidden;
    /* max-width: 10em; */
    height: 1.6em;
    /* padding-inline: 0.5em; */
}
.over-auto {
    overflow: auto;
}
.blue {
    color: blue;
}
.gray {
    color: gray;
}
</style>
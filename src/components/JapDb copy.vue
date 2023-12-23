<script setup>
import { computed, ref } from 'vue';
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

const firstRow = ref(0);
// const lastRow = ref(10);

const lastRow = computed(() => {
    console.log()
    return parseInt(firstRow.value) + 20;
    // return 10;
});

function handleWheel(event) {
    // console.log(firstRow.value)
    // event.preventDefault();
    const delta = Math.sign(event.deltaY); // Get scroll direction
    // sliderValue.value = parseInt(sliderValue.value) + delta; // Adjust the value
    let temp = parseInt(firstRow.value) + delta * 5;
    if(temp < 0) {
        temp = 0;
    } else if(temp >= db.value.length - 20) {
        temp = db.value.length - 20;
    }
    firstRow.value = temp;
}

const selectedCard = ref({});

function select(id) {
    selectedCard.value = db.value[id - 1];
    console.log(id);
    console.log(selectedCard.value);
}

// console.log(db.value);
</script>

<template>
    <section
        class="list"
        @wheel="handleWheel"
    >
        <table >
            <tbody v-if="ready">
                <!-- <tr v-for="row in db" :key="row.id"> -->
                <tr
                    v-for="row in db.slice(firstRow, lastRow)"
                    :key="row.id"
                    @click="select(row.id)"
                >
                    <td class="width-4em">
                        {{ row.id }}
                    </td>
                    <td class="width-10">
                        <div class="cell">
                            <span :class="{'blue': row.altWriting}">{{row.writings}}</span> 
                            <span class="gray">　{{row.rareWritings}}</span>
                        </div>
                    </td>
                    <td class="width-10">
                        <div class="cell">
                            <span>{{row.readings}}</span> 
                            <span class="gray">　{{row.rereReadings}}</span>
                        </div>
                    </td>
                    <td>
                        <div class="cell over-auto" v-html="row.translation" />
                    </td>
                    <td class="width-20">
                        <div class="cell over-auto" v-html="row.example" />
                    </td>
                </tr>
            </tbody>
        </table>
        <input
            type="range"
            orient="vertical"
            class="scroller"        
            min="0"
            max="4900"
            v-model="firstRow"
        >
    </section>
    <section class="edit">
        <input
            type="text"
            class="writings jap-field"
            v-model="selectedCard.writings"
        >
        <input
            type="text"
            class="jap-field gray"
            v-model="selectedCard.rareWritings"
        >
        <input
            type="text"
            class="readings jap-field"
            v-model="selectedCard.readings"
        >
        <input
            type="text"
            class="jap-field gray"
            v-model="selectedCard.rareReadings"
        >
        <input
            type="text"
            class="uk-field"
            v-model="selectedCard.translation"
        >
    </section>
</template>

<style scoped>
.list {
    display: flex;
    width: 100%;
}
.scroller {
    width: 2%;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
}
table {
    width: 98%;
    border-collapse: collapse;
}
td {
    border: 1px solid;
    padding-inline: 0.5em;
}
.cell {
    overflow: hidden;
    height: 1.5em;
}
.width-4em {
    width: 3em;
}
.width-10 {
    width: 10%;
    font-size: 0.9em;
}
.width-20 {
    width: 20%;
}
.over-auto {
    overflow: auto;
}
input[type="text"] {
    padding-inline: 0.2em;
}
.jap-field {
    width: 50%;
    font-size: 1.3rem;
    font-family: "Noto Sans CJK JP";
}
.uk-field {
    width: 100%;
    font-size: 1.2rem;
    height: 1.5em
}

.blue {
    color: blue;
}
.gray {
    color: gray;
}
</style>
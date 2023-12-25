<script setup>
import { ref, computed } from 'vue';
import TableRow from './TableRow.vue';

const { db, selectedNumber }
    = defineProps(['db', 'select', 'selectedNumber', 'lastRow']);

// const lastRow = ref(db.length);
const rowNumber = 18;
const range = computed(() => {
    // console.log('hello there!');
    // lastRow.value = 111;
    return db.slice((lastRow.value - rowNumber), lastRow.value);
});

function handleWheel(event) {
    const delta = Math.sign(event.deltaY);
    let newVal = parseInt(lastRow.value) + delta * 5;
    if(newVal < rowNumber) {
        newVal = rowNumber;
    } else if(newVal >= db.length) {
        newVal = db.length;
    }
    lastRow.value = newVal;
}
</script>

<template>
    <section class="list" @wheel="handleWheel">
        <table>
            <tbody>
                <TableRow
                    v-for="row in range"
                    :key="row.id"
                    :row="row"
                    @click="select(row.cardNumber)"
                    :class="{selected: selectedNumber === row.cardNumber}"
                />
            </tbody>
        </table>
        <input
            type="range"
            orient="vertical"
            class="scroller"        
            :min="rowNumber"
            :max="db.length"
            v-model="lastRow"
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
.selected {
    /* background-color: yellow; */
    border: 2px solid red;
}
</style>
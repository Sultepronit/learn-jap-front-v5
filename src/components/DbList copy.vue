<script setup>
import { ref, computed } from 'vue';
import TableRow from './TableRow.vue';

const { db, selectedId } = defineProps(['db', 'select', 'selectedId']);

const dbLast = db.length;
const lastRow = ref(dbLast);
const rowNumber = 19;
const range = computed(() => {
    return db.slice((lastRow.value - rowNumber), lastRow.value)
});

function handleWheel(event) {
    const delta = Math.sign(event.deltaY);
    let temp = parseInt(lastRow.value) + delta * 5;
    if(temp < rowNumber) {
        temp = rowNumber;
    } else if(temp >= dbLast) {
        temp = dbLast;
    }
    lastRow.value = temp;
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
                    @click="select(row.id)"
                    :class="{selected: selectedId === row.id}"
                />
            </tbody>
        </table>
        <input
            type="range"
            orient="vertical"
            class="scroller"        
            :min="rowNumber"
            :max="dbLast"
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
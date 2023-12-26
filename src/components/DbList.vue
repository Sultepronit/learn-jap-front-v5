<script setup>
import TableRow from './TableRow.vue';

defineProps(['min', 'max', 'range', 'lastRow', 'select', 'selectedNumber']);
const emit = defineEmits(['setLastRow', 'incrementLastRow']);

function handleWheel(event) {
    const delta = Math.sign(event.deltaY) * 5;
    emit('incrementLastRow', delta);
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
            v-show="min < max"
            type="range"
            orient="vertical"
            class="scroller"        
            :min="min"
            :max="max"
            :value="lastRow"
            @change="emit('setLastRow', $event.target.value)"
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
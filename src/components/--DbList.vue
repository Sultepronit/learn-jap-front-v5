<script setup>
const { incrementLastRow } = defineProps([
    'min',
    'max',
    'current',
    'incrementLastRow',
    'setLastRow',
    'TableRow',
    'displayedRange',
    'select',
    'selectedNumber'
]);

function handleWheel(event) {
    const delta = Math.sign(event.deltaY) * 5;
    incrementLastRow(delta);
}        

</script>

<template>
    <section id="table" @wheel="handleWheel">
        <section id="rows">
            <TableRow
                v-for="row in displayedRange"
                :key="row.id"
                :row="row"
                :select="select"
                :selectedNumber="selectedNumber"
            />
            {{ console.log(current) }}
        </section>
        <input
            id="scroller"
            v-show="min < max"
            type="range"
            :min="min"
            :max="max"
            :value="current"
            @change="setLastRow($event.target.value)"
        >
    </section>
</template>


<style>
#table {
    display: flex;
    width: 100%;
}
#rows {
    width: 100%;
    border-top: 1px solid;
    border-right: 1px solid;
}
#scroller {
    writing-mode: vertical-rl
}
.selected {
    background-color: #90ffef;
}
</style>
<script setup>
defineProps(['row']);
</script>
<template>
    <div id="row">
        <p class="cell id-col">
            {{ row.id }}
        </p>
        <p class="cell">
            {{ row.kanji }}
        </p>
        <p class="cell status-col">
            {{ row.repeatStatus }}
        </p>
        <p class="cell width-2sym">
            {{ row.progress }}
        </p>
        <p class="cell width-2sym" :class="{auto: row.autorepeat}">
            {{ row.record }}
        </p>
        <p class="cell">
            {{ row.readings }}
        </p>
        <p class="cell">
            {{ row.links }}
        </p>
        <p class="cell">
            {{ row.otherLinks }}
        </p>
    </div>
</template>

<style scoped>
#row {
    height: 1.5em;
    font-size: 1.3rem;
    border-bottom: 1px solid;
    display: grid;
    grid-template-columns: auto auto auto auto auto 1fr 1fr 1fr;
}
.cell {
    border-left: 1px solid;
    padding-inline: 0.2em;
    overflow: hidden;
}
.id-col {
    width: 3em;
}
.status-col {
    width: 4em;
}
.width-2sym {
    width: 1.4em;
}
.auto {
    color: red;
    border-color: black;
    font-weight: bold;
}
</style>
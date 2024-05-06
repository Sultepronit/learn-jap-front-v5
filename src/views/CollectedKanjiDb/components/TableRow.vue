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
        <div class="cell width-2sym" :class="{auto: row.autorepeat}">
            {{ row.record }}
        </div>
        <div class="cell links">
            {{ row.readings }}
        </div>
        <div class="cell links">
            {{ row.links }}
        </div>
        <p class="cell links">
            {{ row.otherLinks }}
        </p>
    </div>
</template>

<style scoped>
#row {
    font-size: 1.3rem;
    /* display: flex; */
    display: grid;
    grid-template-columns: auto auto auto auto auto 1fr 1fr 1fr;
    /*background: black;*/
}
.cell {
    /*background: white;*/
    /* margin: 1px; */
    border-left: 1px solid;
    border-bottom: 1px solid;
    padding-inline: 0.2em;
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
.links {
    /* width: 15em; */
    /* max-width: 25vw; */
    overflow: hidden;
    height: 1.5em;
}
.auto {
    color: red;
    border-color: black;
    font-weight: bold;
}
.width-jap {
    width: 10em;
    /* font-size: 0.9em; */
}
.width-20 {
    width: 20%;
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
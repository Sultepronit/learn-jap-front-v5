<script setup>
defineProps(['row']);
</script>
<template>
    <div id="row">
        <!-- <td class="width-4em">
            {{ row.id }}
        </td> -->
        <p class="cell id-col">
            {{ row.cardNumber }}
        </p>
        <p class="cell statuc-col">
            {{ row.learnStatus }}
        </p>
        <p class="cell width-2sym">
            {{ row.fProgress }}
        </p>
        <p class="cell width-2sym">
            {{ row.bProgress }}
        </p>
        <p class="cell width-2sym" :class="{auto: row.fAutorepeat}">
            {{ row.fStats }}
        </p>
        <p class="cell width-2sym" :class="{auto: row.bAutorepeat}">
            {{ row.bStats }}
        </p>
        <p class="cell width-jap sans">
            <span :class="{'blue': row.altWriting}">{{row.writings}}</span> 
            <span class="gray">　{{row.rareWritings}}</span>
        </p>
        <p class="cell width-jap">
            <span>{{row.readings}}</span> 
            <span class="gray">　{{row.rareReadings}}</span>
        </p>
        <p
            class="cell"
            v-html="row.translation"
        />
        <p
            class="cell"
            v-html="row.example"
        />
    </div>
</template>

<style scoped>
#row {
    height: 1.5em;
    font-size: 1.3rem;
    border-bottom: 1px solid;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto 2fr 1fr;
}
.cell {
    border-left: 1px solid;
    padding-inline: 0.2em;
    overflow: hidden;
    white-space: nowrap;
}
.id-col {
    width: 2.5em;
}
.statuc-col {
    width: 3.5em;
}
.width-2sym {
    width: 1.4em;
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
.blue {
    color: blue;
}
.gray {
    color: gray;
}
</style>
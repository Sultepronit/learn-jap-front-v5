<script setup>
defineProps(['row']);
</script>
<template>
    <tr>
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
</template>

<style scoped>
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
.blue {
    color: blue;
}
.gray {
    color: gray;
}
</style>
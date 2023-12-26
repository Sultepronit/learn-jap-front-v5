<script setup>
defineProps(['row']);
</script>
<template>
    <tr>
        <!-- <td class="width-4em">
            {{ row.id }}
        </td> -->
        <td class="width-4em">
            {{ row.cardNumber }}
        </td>
        <td class="width-4em">
            {{ row.learnStatus }}
        </td>
        <td class="width-2sym">
            {{ row.fProgress }}
        </td>
        <td class="width-2sym">
            {{ row.bProgress }}
        </td>
        <td class="width-2sym" :class="{auto: row.fAutorepeat}">
            {{ row.fStats }}
        </td>
        <td class="width-2sym" :class="{auto: row.bAutorepeat}">
            {{ row.bStats }}
        </td>
        <td class="width-jap">
            <div class="cell">
                <span :class="{'blue': row.altWriting}">{{row.writings}}</span> 
                <span class="gray">　{{row.rareWritings}}</span>
            </div>
        </td>
        <td class="width-jap">
            <div class="cell">
                <span>{{row.readings}}</span> 
                <span class="gray">　{{row.rareReadings}}</span>
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
    font-size: 1.3rem;
    border: 1px solid;
    padding-inline: 0.2em;
}
.cell {
    overflow: hidden;
    height: 1.5em;
}
.width-4em {
    width: 2.5em;
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
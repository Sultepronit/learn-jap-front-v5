<script setup>
defineProps(['row']);
</script>
<template>
    <tr>
        <td class="width-4em">
            {{ row.id }}
        </td>
        <td class="width-4em">
            {{ row.kanji }}
        </td>
        <td class="width-4em">
            {{ row.repeatStatus }}
        </td>
        <td class="width-2sym">
            {{ row.progress }}
        </td>
        <td class="width-2sym" :class="{auto: row.autorepeat}">
            {{ row.record }}
        </td>
        <td class="links">
            <div class="links">
                {{ row.readings }}
            </div>
        </td>
        <td class="links">
            <div class="links">
                <!-- {{ row.links.replaceAll(',', ', ') }} -->
                {{ row.links }}
            </div>
        </td>
        <td class="links">
            <div class="links">
                {{ row.otherLinks }}
            </div>
        </td>
    </tr>
</template>

<style scoped>
td {
    font-size: 1.3rem;
    border: 1px solid;
    padding-inline: 0.2em;
}
.links {
    /* width: 15em; */
    width: 25vw;
    overflow: hidden;
    height: 1.5em;
}
.cell2 {
    /* width: 20vw; */
    overflow: hidden;
    height: 1.5em;
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
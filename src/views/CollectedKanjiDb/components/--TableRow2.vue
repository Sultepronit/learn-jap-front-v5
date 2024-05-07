<script setup>
const props = defineProps(['range', 'row']);
console.log(this.key);
console.log(props);
</script>
<template>
    <div>Go!</div>
</template>

<style scoped>
#row {
    font-size: 1.3rem;
    border-bottom: 1px solid;
    /* display: flex; */
    display: grid;
    grid-template-columns: auto auto auto auto auto 1fr 1fr 1fr;
}
.cell {
    /*background: white;*/
    /* margin: 1px; */
    border-left: 1px solid;
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
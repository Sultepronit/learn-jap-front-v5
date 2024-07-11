<script setup>
import { ref, computed, watchEffect } from 'vue';
import { sortData, select, searchInStats } from '@/utils/tableControls.js';

const props = defineProps([
    'db',
    'cardNumber',
    'outerSpace',
    'setSelectedCard',
    'TableRow',
    'SearchBar',
    'findText'
]);

//--- get view list ---//
const localList = computed(() => props.db.slice());

const sortOptions = ref({});
function setSortOptions(newVal) {
    sortOptions.value = newVal;
}
const sortedList = computed(() =>
    sortData(localList.value, sortOptions.value)
);

const filterStatsOptions = ref({});
function setFilterStatsOptions(newVal) {
    filterStatsOptions.value = newVal;
}
const filtered1 = computed(() =>
    searchInStats(sortedList.value, filterStatsOptions.value) || sortedList.value
);

const findTextOptions = ref({});
function setFindTextOptions(newVal) {
    findTextOptions.value = newVal;
}
const viewList = computed(() =>
    props.findText(filtered1.value, findTextOptions.value) || filtered1.value
);
// console.log(viewList.value);


//--- show the range of the list ---//
const defaultRowNumber = Math.round((window.innerHeight / 33) - props.outerSpace);
const rowNumber = computed(() =>
    viewList.value.length > defaultRowNumber ? defaultRowNumber : viewList.value.length
);

const lastDisplayedRow = ref(0);

function setLastDisplayedRow(newVal) {
    lastDisplayedRow.value = newVal < rowNumber.value ? rowNumber.value
        : newVal > viewList.value.length ? viewList.value.length : newVal;
}

function incrementLastDisplayedRow(delta) {
    setLastDisplayedRow(Number(lastDisplayedRow.value) + delta);
}

const displayedRange = computed(() => {
    return viewList.value.slice(
        (lastDisplayedRow.value - rowNumber.value),
        lastDisplayedRow.value
    );
});

//--- select item ---//
const selectedNumber = ref(0);

function selectItem(cardNumber, changeDisplay) {
    const selectedCard = select(props.db, cardNumber);
    if(!selectedCard) return;

    selectedNumber.value = Number(cardNumber);
    props.setSelectedCard(selectedCard);

    console.log(changeDisplay, 'do something!');
    if(changeDisplay) {
        // do something
        // setLastDisplayedRow(cardNumber);
    }
}

//--- react to cahanges ---//
watchEffect(() => {
    console.log('change!');
    lastDisplayedRow.value = viewList.value.length;

    if(viewList.value.length < 1) return;
    selectItem(viewList.value[viewList.value.length - 1][props.cardNumber])
});
</script>

<template>
    <SearchBar
        :selectedNumber="selectedNumber"
        :select="selectItem"
        :setSortOptions="setSortOptions"
        :setFilterStatsOptions="setFilterStatsOptions"
        :setFindTextOptions="setFindTextOptions"
    />
    <section
        id="table"
        @wheel="incrementLastDisplayedRow(Math.round($event.deltaY) / 16)"
    >
        <div id="rows">
            <TableRow
                v-for="row in displayedRange"
                :key="row.id"
                :row="row"
                :select="selectItem"
                :selectedNumber="selectedNumber"
            />
            <!-- {{ console.log(selectedNumber) }} -->
            <!-- {{ console.log(scrollerValue, min, max) }} -->
        </div>
        <input
            id="scroller"
            v-show="rowNumber < viewList.length"
            type="range"
            :min="rowNumber"
            :max="viewList.length"
            :value="lastDisplayedRow"
            @change="setLastDisplayedRow($event.target.value)"
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
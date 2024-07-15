<script setup>
import CommonSearchBar from './CommonSearchBar.vue';

import { ref, computed, watch } from 'vue';
import { sortData, select, searchInStats } from '@/utils/tableControls.js';

const props = defineProps([
    'db',
    'cardNumber',
    'outerSpace',
    'setSelectedCard',
    'enforcedList',
    'findText',
    'filterColumns',
    'sortColumns',
    'TableRow',
    'SearchText',
]);

const sortOptions = ref({});
function setSortOptions(newVal) {
    sortOptions.value = newVal;
}

const filterStatsOptions = ref({});
function setFilterStatsOptions(newVal) {
    filterStatsOptions.value = newVal;
}

const findTextOptions = ref({});
function setFindTextOptions(newVal) {
    findTextOptions.value = newVal;
}

const preselected = ref(null);
function preselect(val) {
    preselected.value = val;
}

const mainList = computed(() => {
    const sortedList = sortData(props.db.slice(), sortOptions.value);
    const filtered1 = searchInStats(sortedList, filterStatsOptions.value) || sortedList
    const filtered2 = props.findText(filtered1, findTextOptions.value) || filtered1;

    if(filtered2.length === 1) {
        preselect(filtered2[0]);
        return sortedList;
    }

    preselect(null);
    return filtered2;
});

const viewList = computed(() => {
    if(props.enforcedList) {
        return props.enforcedList;
    }

    return mainList.value;
});

//--- show the range of the list ---//
const defaultRowNumber = Math.round((window.innerHeight / 33) - props.outerSpace);
const rowNumber = computed(() =>
    viewList.value.length > defaultRowNumber ? defaultRowNumber : viewList.value.length
);

const lastDisplayedRow = ref(0);

function setLastDisplayedRow(newVal) {
    // console.log(newVal);
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
const viewListPosition = ref(0);

function selectItem(cardNumber, changeDisplay) {
    const selectedCard = select(props.db, cardNumber);
    if(!selectedCard) return;

    selectedNumber.value = Number(cardNumber);
    props.setSelectedCard(selectedCard);

    viewListPosition.value = viewList.value.findIndex(item => item.id === selectedCard.id) + 1;
    // console.log(viewListPosition.value);

    if(changeDisplay && viewListPosition.value > 0) {
        setLastDisplayedRow(viewListPosition.value);
    }
}

//--- react to cahanges ---//
function changeView() {
    console.log('change!');
    lastDisplayedRow.value = viewList.value.length;
}

function selectDefault() {
    if(viewList.value.length < 1) {
        viewListPosition.value = 0;
        return;
    }

    if(preselected.value) {
        selectItem(preselected.value[props.cardNumber], true);
    } else if(!props.enforcedList) {
        selectItem(viewList.value[viewList.value.length - 1][props.cardNumber]);
    }
}

changeView();
selectDefault();

watch(viewList, () => changeView());
watch([mainList, preselected], () => selectDefault());
</script>

<template>
    <CommonSearchBar
        :selectedNumber="selectedNumber"
        :select="selectItem"
        :viewListPosition="viewListPosition"
        :viewListLength="viewList.length"
        :filterColumns="filterColumns"
        :sortColumns="sortColumns"
        :setSortOptions="setSortOptions"
        :setFilterStatsOptions="setFilterStatsOptions"
        :setFindTextOptions="setFindTextOptions"
        :SearchText="SearchText"
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
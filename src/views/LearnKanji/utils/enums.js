const repeatStages = {
    REPEAT: 'repeat',
    PROBLEM: 'problem',
    // AUTOREPEAT: 'autorepeat'
};

function is(sample) {
    return sample.name === this.name;
}

const marks = {
    BEST: { name: 'best', increment: 2, is },
    GOOD: { name: 'good', increment: 1, is },
    BAD: { name: 'bad', increment: -1, is },
    NEUTRAL: { name: 'neutral', increment: 0, is },
    AUTOREPEAT: { name: 'autorepeat', increment: 0, is },
};

export { repeatStages, marks };
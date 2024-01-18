const repeatStages = {
    REPEAT: 'repeat',
    PROBLEM: 'problem',
    AUTOREPEAT: 'autorepeat'
};

const marks = {
    BEST: { name: 'best', increment: 2 },
    GOOD: { name: 'good', increment: 1 },
    BAD: { name: 'bad', increment: -1 },
    NEUTRAL: { name: 'neutral', increment: 0 },
};

export { repeatStages, marks };
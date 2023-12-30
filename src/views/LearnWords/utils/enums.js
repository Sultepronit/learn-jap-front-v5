const learnStages = {
    LEARN: 'l',
    CONFIRM: 'c',
    REPEAT: 'rpt',
    RECOGNIZE: 'rcg'
};

const repeatVariants = {
    NORMAL: 'n',
    PROBLEM: 'p'
};

const directions = {
    FORWARD: 'f',
    BACKWARD: 'b'
};

const marks = {
    GOOD: { name: 'good', increment: 1 },
    BAD: { name: 'bad', increment: -1 },
    NEUTRAL: { name: 'neutral', increment: 0 }
};

export { learnStages, repeatVariants, directions, marks };
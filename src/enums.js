// const learnStages = {
//     LEARN: 'learn',
//     CONFIRM: 'confirm',
//     REPEAT: 'repeat',
//     RECOGNIZE: 'recognize'
// };

const learnStages = {
    LEARN: 'l',
    CONFIRM: 'c',
    REPEAT: 'rpt',
    RECOGNIZE: 'rcg'
};

const repeatVariants = {
    NORMAL: 'normal',
    PROBLEM: 'problem'
};

// const directions = {
//     FORWARD: 'forward',
//     BACKWARD: 'backward'
// };

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
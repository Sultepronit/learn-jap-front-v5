const learnStages = {
    LEARN: 'learn',
    CONFIRM: 'confirm',
    REPEAT: 'repeat',
    RECOGNIZE: 'recognize',
    AUTOREPEAT: 'autorepeat'
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
    GOOD: 'good',
    BAD: 'bad',
    NEUTRAL: 'neutral',
    RESET: 'reset',
    QUESTION: 'question'
};

// const marks = {
//     GOOD: { name: 'good', increment: 1 },
//     BAD: { name: 'bad', increment: -1 },
//     NEUTRAL: { name: 'neutral', increment: 0 },
//     RETURN: { name: 'return', increment: 0 },
//     QUESTION: { name: 'question', increment: 0 }
// };

export { learnStages, repeatVariants, directions, marks };
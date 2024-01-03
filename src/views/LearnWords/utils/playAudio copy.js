const audio = new Audio();
const url = 'https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kana=';

audio.oncanplaythrough = () => {
    const duration = audio.duration;
    console.log('loaded!');
    if(duration > 5) {
        console.log('Nothing to play!');
        // audio.pause();
        audio.src = null;
        audio.dispatchEvent(new Event('ended'));
    }
};

function playPromise() {
    return new Promise(resolve => {
        audio.play();
        audio.onended = () => {
            resolve('ended');
        }
    });
}

async function playAudio(card) {
    const kanji = card.value.parsed.writingsArray[0];
    const variants = card.value.parsed.readingsArray;
    for(const variant of variants) {
        audio.src = `${url}${variant}&kanji=${kanji}`;
        const res = await playPromise();
        console.log(res, variant);
    }
    // const res = await playPromise();
    // console.log(res);
}

function preloadAudio(card) {
    // console.log('preload audio!');
    // const kanji = card.value.parsed.writingsArray[0];
    // const kana = card.value.parsed.readingsArray[0];
    // audio.src = `${url}${kana}&kanji=${kanji}`;
}

export default playAudio;
export { preloadAudio };
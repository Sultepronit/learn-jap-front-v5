const audio = new Audio();
const url = 'https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kana=';

audio.oncanplaythrough = () => {
    const duration = audio.duration;
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
}

export default playAudio;
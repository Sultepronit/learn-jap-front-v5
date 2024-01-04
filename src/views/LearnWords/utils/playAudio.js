const audio = new Audio();
const url = 'https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kana=';

audio.oncanplay = () => {
    if(audio.duration > 5) {
        console.log('Nothing to play!');
        audio.dispatchEvent(new Event('ended'));
    } else {
        audio.play();     
    }
};

function playPromise(src) {
    return new Promise(resolve => {
        audio.src = src;  
        audio.onended = () => {
            resolve('ended');
        }
    });
}

async function playAudio(card) {
    const kanji = card.value.parsed.writingsArray[0];
    const variants = card.value.parsed.readingsArray;
    for(const variant of variants) {
        const res = await playPromise(`${url}${variant}&kanji=${kanji}`);
        console.log(res, variant);
    }
}

export default playAudio;
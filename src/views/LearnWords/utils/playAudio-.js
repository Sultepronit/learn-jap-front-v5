// const audio = new Audio();
const url = 'https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kana=';

class SpecialAudio {
    constructor() {
        this.audio = new Audio();
        this.invalid = false;
        this.audio.oncanplay = () => {
            const duration = this.audio.duration;
            console.log('loaded!');
            if(duration > 5) {
                // console.log('Nothing to play!');
                this.audio.pause();
                this.audio.dispatchEvent(new Event('ended'));
                // this.audio.src = null;
                this.invalid = true;
            }
        };
    }

    setSrc(src) {
        this.audio.pause();
        this.audio.src = src;
        this.invalid = false;
    }
    
    play() {
        return new Promise(resolve => {
            if(this.invalid) {
                resolve('aborted');
            } else {
                this.audio.play();
                this.audio.onended = () => {
                    resolve('ended');
                }
            }
        });
    }
}

const audio = new SpecialAudio();
console.log(audio);

// const playList = [new SpecialAudio()];
// console.log(playList);

class PlayList {
    url = 'https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kana=';
    list = [new SpecialAudio()];
    counter = 0;
    variants = [];

    load(card) {
        const kanji = card.value.parsed.writingsArray[0];
        const variants = card.value.parsed.readingsArray;
        this.variants = variants;
        variants.push('--');
        variants.unshift('---');
        // console.log()
        this.counter = variants.length;
        for(let i = 0; i < variants.length; i++) {
            if(this.list.length < i + 1) {
                this.list.push(new SpecialAudio());
            }
            this.list[i].setSrc(`${url}${variants[i]}&kanji=${kanji}`);
        }
    }

    async play() {
        for(let i = 0; i < this.counter; i++) {
            console.log(i);
            const res = await this.list[i].play();
            console.log(i, res, this.variants[i]);
            // this.list[i].play().then(res => {
            //     console.log(res);
            // });
        }
    }
}

const playList = new PlayList();

async function playAudio(card) {
    // const kanji = card.value.parsed.writingsArray[0];
    // const variants = card.value.parsed.readingsArray;
    // for(const variant of variants) {
    //     audio.src = `${url}${variant}&kanji=${kanji}`;
    //     const res = await playPromise();
    //     console.log(res, variant);
    // }

    // const res = await audio.play();
    // console.log(res);
    playList.play();
}

function preloadAudio(card) {
    console.log('preload audio!');
    // const kanji = card.value.parsed.writingsArray[0];
    // const kana = card.value.parsed.readingsArray[0];
    // // audio.src = `${url}${kana}&kanji=${kanji}`;
    // audio.setSrc(`${url}${kana}&kanji=${kanji}`);
    playList.load(card);
    console.log(playList);
}

export default playAudio;
export { preloadAudio };
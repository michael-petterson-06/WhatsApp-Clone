// import { Format } from './../util/Format';
import { ClassEvent } from './../util/ClassEvent';

export class MicrophoneController extends ClassEvent {
  
    
    constructor(){
        // "Super()" Chama o construtor do pai, nesse caso ClassEvent
        //Assim ele usa todos os this e métodos do pai (herança)
        super(); 

        this._mimeType = 'audio/webm';

        this._available = false;

        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {

            this._available = true;
           
            this._stream = stream;

            // let audio = new Audio();

            // this._videoEl.src = URL.createObjectURL(stream) Depreciativo
            // audio.srcObject = stream;

            // audio.play();

            // this.trigger('ready', {
            //     sream: this._stream,
            //     audio: this._audio
            // });
            this.trigger('ready', this._stream);

        }).catch(err => {

            console.error(err);

        });

    }

    // stopTimer(){

    //     clearInterval(this._recordMicrophoneInterval);

    // }

    // startTimer(){

    //     let start = Date.now();

    //     this._recordMicrophoneInterval = setInterval(() => {

    //         this.trigger('timer', {
    //             displayTimer: Format.toTime(Date.now() - start)
    //         });

    //     }, 100);

    // }

    startRecorder(options = {}){

        // if (this._available) {
        if ( this.isAvailable()) {

            // this.startTimer();

            // this._mediaRecorder = new MediaRecorder(this._stream, Object.assign(options, {
            //     mimeType: 'audio/webm'
            // }));
            this._mediaRecorder = new MediaRecorder(this._stream,  {
                mimeType: this._mimeType,
            });

            this._recordedChunks = [];

            this._mediaRecorder.addEventListener('dataavailable', e => {

                if (e.data.size > 0) this._recordedChunks.push(e.data);

            });

            this._mediaRecorder.addEventListener('stop', e => {

                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });

                // let cx = new AudioContext();

                // var fileReader = new FileReader();

                let filename = `rec${Date.now()}.webm`;
                let file = new File([blob], filename, {
                    type: this._mimeType,
                    lastModified: Date.now()
                });
                console.log('file', file)

                let reader = new FileReader();


                     reader.onload = e => {

                        let audio = new Audio(reader.result)
                        audio.play()
                        
                    };

                    reader.readAsDataURL(file)

                // fileReader.onload = e => {

                //     cx.decodeAudioData(fileReader.result).then(decode => {

                //         let file = new File([blob], 'rec' + new Date().getTime() + '.webm', {
                //             type: 'audio/webm',
                //             lastModified: Date.now()
                //         });

                //         this.trigger('recorded', file, decode);

                //     });

                // };

                // fileReader.readAsArrayBuffer(blob);                

            });

            this._mediaRecorder.start();

        }

    }


    stopRecorder(){

        // if (this._available) {
            if ( this.isAvailable()) {
        
            this._mediaRecorder.stop();
            this.stop();
            // this.stopTimer();

        }

    }

    // play(){

    //     if (this._available) {

    //         this._audio = new Audio();

    //         this._audio.src = URL.createObjectURL(this._stream);

    //         this._audio.play();

    //         this.trigger('play', {
    //             sream: this._stream,
    //             audio: this._audio
    //         });

    //     }

    // }

    //Verifica se usuário permitiu o audio ou não
    isAvailable() {
        return this._available;
    }

    stop(){

        // if (this._available) {

            this._stream.getTracks().forEach(track => {

                track.stop();

            });

            // this.trigger('stop');

        // }

    }

}
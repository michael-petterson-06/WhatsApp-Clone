// import { Format } from './../util/Format';
import { ClassEvent } from './../util/ClassEvent';

export class MicrophoneController extends ClassEvent {
  
    
    constructor(){
        // "Super()" Chama o construtor do pai, nesse caso ClassEvent
        //Assim ele usa todos os this e métodos do pai (herança)
        super(); 
        
        this._mimeType = 'audio/webm';

        this._available = false;

        //Ativando microfone
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {

            //Se usuário permitiu audio eu valido para true
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
            

            //"Estou pronto para gravar"
            this.trigger('ready', this._stream);

        }).catch(err => {

            console.error(err);

        });

    }

    stopTimer(){

        clearInterval(this._recordMicrophoneInterval);

    }

    startTimer(){
        
        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(() => {

            // this.trigger('recordtimer', {
            //     displayTimer: Format.toTime(Date.now() - start)
            // });


            this.trigger('recordtimer', (Date.now() - start));


        }, 100);

    }

    stop(){

        // if (this._available) {

            this._stream.getTracks().forEach(track => {

                track.stop();

            });

            // this.trigger('stop');

        // }

    }


    startRecorder(options = {}){
        
       // if (this._available) {
        if ( this.isAvailable()) {

            // this.startTimer();

            // this._mediaRecorder = new MediaRecorder(this._stream, Object.assign(options, {
            //     mimeType: 'audio/webm'
            // }));

            //Gravando microfone
            this._mediaRecorder = new MediaRecorder(this._stream,  {
                mimeType: this._mimeType,
            });

            this._recordedChunks = [];

            this._mediaRecorder.addEventListener('dataavailable', e => {

                if (e.data.size > 0) this._recordedChunks.push(e.data);

            });

            //Parar a Gravação
            this._mediaRecorder.addEventListener('stop', e => {

                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });

                let filename = `rec${Date.now()}.webm`;

                let cx = new AudioContext();

                var fileReader = new FileReader();
                            
                fileReader.onload = e => {
                    
                    cx.decodeAudioData(fileReader.result).then(decode => {

                        //blob para manipulação de binário
                        let file = new File([blob], filename, {
                            type: this._mimeType,
                            lastModified: Date.now()
                        });
                        
                        // O click no btnCancelMicrophone chega aqui mas não aciona o trigger porque não tem "on" para ouvir

                        // O click no btnFinishMicrophone aciona o trigger porque lá o "on" está ouvindo

                        this.trigger('recorded', file, decode);

                    });

                };

                fileReader.readAsArrayBuffer(blob);                

            });

            this._mediaRecorder.start(); //Aciona o evento "dataavailable".
            this.startTimer();

        }

    }


    stopRecorder(){
        
        // if (this._available) {
            if ( this.isAvailable()) {
        
            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();

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
   
}
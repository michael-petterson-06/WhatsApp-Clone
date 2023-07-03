class CameraController {

    constructor(videoEl){

        this._videoEl = videoEl;
        //Pedir permissão para acessar a camera
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {

            // this._stream = stream;
            //Acha o caminho da camera
            this._videoEl.src = URL.createObjectURL(stream);
            //Mostra a camera
            this._videoEl.play();

        }).catch(err => {

            console.error(err);

        });

    }

    // takePicture(mimeType = 'image/png'){

    //     let canvas = document.createElement('canvas');

    //     canvas.setAttribute('height', this._videoEl.videoHeight);
    //     canvas.setAttribute('width', this._videoEl.videoWidth);

    //     let context = canvas.getContext('2d');

    //     context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

    //     return canvas.toDataURL(mimeType);

    // }

    // stop(){

    //     this._stream.getTracks().forEach(track => {

    //         track.stop();

    //     });

    // }

}
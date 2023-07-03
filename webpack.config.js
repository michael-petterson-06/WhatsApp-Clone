// const path = require('path');

// module.exports = {
//     entry: './src/app.js',
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, '/dist'),
//         publicPath: 'dist'
        
//     }
// };

const path = require('path');

module.exports = {
    entry: {
        app: './src/app.js',
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist',
        filename: '[name].bundle.js'
    }
};
const emitter = require('./file_emitter');

emitter.on('myevent', data => {
    console.log('ON: myevent', data);
});

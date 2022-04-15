const EventEmitter = require('events');
const emitter = new EventEmitter();

const emitf =  function() {
    emitter.emit('myevent', {message: Math.random()});
}

module.exports = {
    emitter,
    emitf
};

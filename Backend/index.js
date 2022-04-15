const emitterModule = require('./file_emitter');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

emitterModule.emitter.on('myevent', data => {
    console.log('ON: myevent', data);
});

const start = async () =>{
    for await (const line of readline) {
        console.log(`you entered: ${line}`);
        emitterModule.emitf();
        if (line === 'x') {
            readline.close();
        }
    }
}
start();
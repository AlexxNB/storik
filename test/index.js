let logstore = [];

const storik = require('./storik.js');

const myStore = storik('initial value',set =>{
    log('First Subscription');
    set('value from first subscription hook');

    return ()=>log('Last unsubscription');
});

const un1 = myStore.subscribe(value => log('Subscription #1:',value));
const un2 = myStore.subscribe(value => log('Subscription #2:',value));

myStore.set('new value');
myStore.update(value => value.toUpperCase());

un1();

myStore.set(10);
myStore.update(value => 10*10);

un2();

test(`First Subscription
Subscription #1: value from first subscription hook
Subscription #2: value from first subscription hook
Subscription #1: new value
Subscription #2: new value
Subscription #1: NEW VALUE
Subscription #2: NEW VALUE
Subscription #2: 10
Subscription #2: 100
Last unsubscription`);

///// helpers ////

function log(){
    const text = Array.from(arguments).join(' ')
    logstore.push(text);
    console.log(text);
}

function test(pattern){
    const logtext = logstore.join('\n');
    process.exit(logtext === pattern ? 0 : 1);
}
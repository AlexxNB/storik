# storik

Storik is very tiny (~ 400 bytes!) store with subscription. It is based on observables principles and inspired by writable stores from Svelte package.

## Usage


### Simple case

```javascript
import storik from 'storik';

const mystore = storik('some initial value');
....
const unsubscribe = mystore.subscribe( value => console.log('Hey! My value just changed:',value));
// Hey! My value just changed: some initial value
....
mystore.set('new value');  
// Hey! My value just changed: new value
....
mystore.update(value => value.toUpperCase());  
// Hey! My value just changed: NEW VALUE
....
unsubscribe();
```

### First and lust subscribers

```javascript
import storik from 'storik';

const mystore = storik(123,()=>{
    console.log("I run every time when number of subscribers changes from 0 to 1");
    return ()=>console.log("I run every time when number of subscribers changes from 1 to 0");
});
....
const un1 = mystore.subscribe( value => console.log("I am subscriber #1"));
// I run every time when number of subscribers changes from 0 to 1
// I am subscriber #1
....
const un2 = mystore.subscribe( value => console.log("I am subscriber #2"));
// I am subscriber #2
...
un1();
//<nothing>
un2();
//I run every time when number of subscribers changes from 1 to 0
....
const un3 = mystore.subscribe( value => console.log("I am subscriber #3"));
// I run every time when number of subscribers changes from 0 to 1
// I am subscriber #3
```

### Custom store

You can create the store with very complex behaviour, just use store's methods `subscribe`,`set` and `update` as bricks.

```javascript
import storik from 'storik';

function counterStore(){
    const {subscribe,set,update} = storik(0);

    return {
        subscribe,
        increment: () => update(value => value + 1),
        decrement: () => update(value => value - 1),
        reset: () => set(0)
    }
}
...

const counter = counterStore();

counter.subscribe(value => console.log('Counter value is',value));
//Counter value is 0
counter.increment();
//Counter value is 1
counter.increment();
//Counter value is 2
counter.reset();
//Counter value is 0
counter.decrement();
//Counter value is -1
```

## API

### Storik initialization

#### `storik(initial,on_first_subscriber)`

Function, which returns the store object. Returns `Storik store object` First param is `initial` value of the new store. Second param is optional. It is a callback-function, which will be called each time when number of subscribers changes from 0 to 1. This function get `set(value)` method as argument, which allows to set new store value. It May return other callback-function, which will be called when number of subscribers will change from 1 to 0. 

### Storik store object


#### `subscribe(callback)`

Register the store subscription. Whenever store's value will change, `callback` function will be called with `value` passed. At the start of subscription `callback` function will be called once.


#### `get()`

Get current value of the store. 


#### `set(value)`

Set new `value` of the store. Will triger all subscribers.


#### `update(callback)`

Allows to update store value. `callbak` function gets current `value` as a parameter and MUST return changed value, which be set as new store value. Will triger all subscribers.
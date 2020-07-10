# storik

Storik is very tiny (~ 400 bytes!) store with subscription. It is based on observables principles and inspired by writable stores from Svelte package.

## Usage


### Simple case

```javascript
import storik from 'stroik';

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
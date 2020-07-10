export default function(initial,onfirst){

    let state = initial;
    let listeners = [];

    const set = v => {
        if(not_equal(v,state)){
            const old = state;
            state = v;
            listeners.forEach(cb=>cb(state,old));
        }
    }

    const update = (cb) => set(cb(state));

    let onlast = ()=>{};

    const unsubscribe = cb => {
        listeners = listeners.filter(f => f !== cb);
        if(listeners.length === 0) onlast();
    }

    const subscribe = (cb)=>{
        if(listeners.length === 0){
            const f = onfirst(set);
            if(typeof f === 'function') onlast = f;
        }
        listeners.push(cb);
        cb(state);
        return ()=>unsubscribe(cb);
    }
    
    return {
        subscribe,
        set,
        update
    }
}

function not_equal(a, b) {
	return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
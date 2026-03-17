'use strict';

const poolify = (factory, options, size, max) => {
    const instances = Array.from({length: size}).map(() => {
        return factory.apply(null, options);
    });


    return {
        push: (instance) => {
            if (instances.length < max) {
                instances.push(instance);
            }
        },
        pop: () => {
            return instances.pop() || factory.apply(null, options);
        }
    }
};

// Usage

const createBuffer = (size) => new Uint8Array(size);
const pool = poolify(createBuffer, [4096], 10, 15);

const instance = pool.pop();
console.log({instance});
pool.push(instance);

const testTarget = {
    name: "David",
    gender: "male",
    units: 10000,
    level: 2,
    personInfo: {
        hobby: "Programming",
        favoriteNumbers: [1, 2, 3],
        favoriteColors: [{
            type: "light",
            color: "red",
            test: {
                val: 123
            }
        }, {
            type: "dark",
            color: "blue"
        }]
    },
    otherInfo: {
        soccer: true,
        pc: {
            cpu: "AMD ftw",
            gpu: "Radeon 9800 Pro",
            ram: "rambus 256mb"
        }
    }
};

const makeHandler = () => {
    const storage = new WeakMap();
    const validator = {
        get: (obj, prop) => {
            if (obj[prop] && typeof obj[prop] === "object") {
                if (!storage.get(obj[prop])) {
                    // console.log(`Setting property '${prop}' to WeakMap`);
                    storage.set(obj[prop], new Proxy(obj[prop], validator));
                } else {
                    // console.log(`Already have property '${prop}' in WeakMap`);
                }
                return storage.get(obj[prop]);
            }
            console.log(typeof prop);
            if (["string", "number"].includes(typeof prop)) {
                console.log(`Accessing property '${prop}'`);
            }
            return obj[prop];
        }
    };
    return validator;
};

const proxiedObject = new Proxy(testTarget, makeHandler());

console.log(proxiedObject.name);
console.log("\n");

console.log(proxiedObject.personInfo.hobby);
console.log("\n");

console.log(proxiedObject.personInfo.hobby);
console.log("\n");

console.log(proxiedObject.personInfo.favoriteNumbers);
console.log("\n");

console.log(proxiedObject.personInfo.hobby);
console.log("\n");

console.log(proxiedObject.personInfo.favoriteNumbers);
console.log("\n");

console.log(proxiedObject.personInfo.favoriteColors);
console.log("\n");

console.log(proxiedObject.personInfo.favoriteColors);
console.log("\n");

console.log(proxiedObject.personInfo.favoriteColors[0]);
console.log("\n");

console.log(proxiedObject.personInfo.favoriteColors[0]);
console.log("\n");

console.log(proxiedObject.personInfo.favoriteColors[0].type);
console.log("\n");

console.log(proxiedObject.personInfo.favoriteColors[0].test);
console.log("\n");

console.log(proxiedObject.personInfo.favoriteColors[0].test);
console.log("\n");
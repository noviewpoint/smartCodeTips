class TestObj {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  methodThatIsNotEnumerable() {
    return 123;
  }
}
TestObj.prototype.prototypeProperty = null;

class SubTestObj extends TestObj {
  constructor(...params) {
    super(...params);
    this.d = true;
  }
}

const plainObj = { a: 1, b: undefined, c: null };
const testObj = new TestObj(1, "b");

const testObj2 = new SubTestObj(1, "b", undefined);

// 1: old way
const oldWay = obj => {
  const props = [];
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      props.push(prop);
    }
  }
  return props;
};

console.log(oldWay(plainObj)); // a, b, c
console.log(oldWay(testObj)); // a, b // skips prototypeProperty and methodThatIsNotEnumerable
console.log(oldWay(testObj2)); // a, b, d // skips prototypeProperty and methodThatIsNotEnumerable

// 2: Object.getOwnPropertyNames() also returns non enumerable properties

console.log(Object.getOwnPropertyNames(plainObj)); // a, b, c
console.log(Object.getOwnPropertyNames(testObj)); // a, b // skips prototypeProperty and methodThatIsNotEnumerable
console.log(Object.getOwnPropertyNames(testObj2)); // a, b, d // skips prototypeProperty and methodThatIsNotEnumerable

// 2: Object.keys() and Object.values() if needed

console.log(Object.keys(plainObj)); // a, b, c
console.log(Object.keys(testObj)); // a, b // skips prototypeProperty and methodThatIsNotEnumerable
console.log(Object.keys(testObj2)); // a, b, d // skips prototypeProperty and methodThatIsNotEnumerable

// 3: Object.entries() and Array destructuring

console.log(Object.entries(plainObj).map(([k, v]) => k)); // a, b, c
console.log(Object.entries(testObj).map(([k, v]) => k)); // a, b // skips prototypeProperty and methodThatIsNotEnumerable
console.log(Object.entries(testObj2).map(([k, v]) => k)); // a, b, d // skips prototypeProperty and methodThatIsNotEnumerable

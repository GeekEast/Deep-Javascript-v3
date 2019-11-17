<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

  - [Issues:](#issues)
- [Type System](#type-system)
  - [Primitive Types](#primitive-types)
  - [Weird Types](#weird-types)
  - [Undefined vs Undeclared](#undefined-vs-undeclared)
  - [Special Values](#special-values)
  - [Polyfill Pattern](#polyfill-pattern)
  - [Fundemental Objects](#fundemental-objects)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Issues:
- In Javascript, `variables` don't have types, `values` have.
- In Javascript, "every thing is a an object" was **wrong**
## Type System
### Primitive Types
- undefined (default value, and not object)
- string (can behave like object)
- number (can behave like object)
- boolean (not object)
- object (object)
- symbol (not object)

### Weird Types
- undeclared (not object)
- null (subtype of **object**)
- function: (not object)
- array: (subtype of object)
- BigInt: Will be added in the future (not object)

```javascript
// x is initialized and doesn't currently has a value
let x;
console.log(typeof x);
x = 1;
console.log(typeof x);
x = '';
console.log(typeof x);
x = true;
console.log(typeof x);
x = {};
console.log(typeof x);
x = Symbol();
console.log(typeof x);
x = null
console.log(typeof x); // null is in the field of object
x = () => console.log('a');
console.log(typeof x);
```

### Undefined vs Undeclared
- `Undeclared` means it's never been created in any scope that we have access to.
- `Uninitialized` means it's off-limit that you can not touch on it in any shape of form but it has been created.
- `Undefined` means there is a defintely a thing and at the moment it has not value.
- `null` means it's an object and its current value is null
- `NaN` means it's a number and it's invalid

### Special Values
- `Nan`: an invalid **number**; It's a number.
- Numeric Operation should only return a number
  - Don't return `undefined`
  - Don't return `null`
  - Don't return `false`
  - Don't return `-1`
  - Dont' return `0`
```javascript
let myAge = Number('0o46');
let myNextAge = Number('39');
let myCastAge = Number('n/a'); // NaN
console.log(myAge - 'my son age') // NaN
// IEEE says Nan is not equal to each other
// NaN doesn't have identity property
console.log(myCastAge === myCastAge) // false!

// isNan will do the coerce at first
isNaN(1); // false
isNaN(myCastAge) // true
// string is not number so it cannot be NaN
isNaN('hello') // true

// won't do the coercion at first
Number.isNaN(1) // false
Number.isNaN(myCastAge) // true
Number.isNaN('hello')
```
- `-0`
  - Zero with **direction** `minus`
```javascript
let trendRate = -0;
trendRate === -0 // true

trendRate.toString() // "0" !
trendRate === 0; // true !
trendRate < 0; // false
trendRate > 0; // false

// 原始检测
Object.is('hello', NaN) // false
Object.is(trendRate, -0) // true
Object.is(trendRate, 0) // false;


// 获得方向
Math.sign(-3) // -1
Math.sign(3) // 1
Math.sign(-0) // -0
Math.sign(0) // 0

// define your own sign method
function sign(v) {
  return v !== 0 ? Math.sign(v) : Object.is(v, -0) ? -1 : 1
}

sign(-3) // -1
sign(3) // 1
sign(-0) // -1
sign(0) // 1
```
### Polyfill Pattern
```javascript
if (!Object.is) {
  Object.is = function ObjectIs() {
    ...
  }
}
```

### Fundemental Objects
- Use `new`
  - `Object()`
  - `Array()`
  - `Function()`
  - `Date()`
  - `RegExp()`
  - `Error()`
- Don't use `new`, use primitive type
  - `String()`
  - `Number()`
  - `Boolean()`
```javascript
let date = new Date()
let date1 = new Date("March 6, 2019")
date1.toUTCString();
// 转型方程
let myGPA = String(transcript.gpa);
// Number()
// Boolean()
```
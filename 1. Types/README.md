<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Types](#types)
  - [**Primitive Types**](#primitive-types)
  - [**Object**](#object)
  - [Quick Example](#quick-example)
- [Emptiness](#emptiness)
- [Special value](#special-value)
  - [Special NaN](#special-nan)
  - [Special -0](#special--0)
- [Constructor Time](#constructor-time)
- [Commons](#commons)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Types
> In Javascript, statement "every thing is a an object" is **wrong**. Primitive types are not objects. But some of them can **behave** like objects.

#### [**Primitive Types**](https://www.ecma-international.org/ecma-262/9.0/#sec-primitive-value)
> In Javascript, `variable` doesn't have types, `value` have.
- `Undefined`: **created** but has **no** value; **default** value
- `Null`: represents the intentional absence of any **object** value
- `Boolean`: `true` or `false` (not `1` and `0`); can behave like an object: `Boolean`
- `Number`: `NaN`, `-0`, `0`，`-Infinite`, `Infinite `and others; can behave like an object: `Number`
- `String`: `''` and other; can behave like an object: `String`
- `Symbol`: **unique** and **non-string**

#### [**Object**](https://www.ecma-international.org/ecma-262/9.0/#sec-terms-and-definitions-object)
> a collection of properties; a sinle prototype
- `null`
- `array`
- `function`
- ...

#### Quick Example
- **Normal Parts**
```javascript
var v; console.log(typeof v); // undefined;

v = '1'; console.log(typeof v); // string

v = 2; console.log(typeof v); //number

v = true; console.log(typeof v); // boolean

v = {}; console.log(typeof v); // object

v = Symbol(); console.log(typeof v); // symbol
```

<!-- more -->

- **Weird Parts**
```javascript
console.log(typeof doesntExist) // undefined! I think it should be undeclared.
var v = null; console.log(v) // object! why not null?
v = function(); console.log(v) // function! what? why not object?
v = [1,2,3]; console.log(v); // object! strange! and what a mess!
```
- **Weird Parts Exploration**
```javascript
console.log(doesnExist) // ReferenceError
var v = null; console.log(v === null); // true
var v = function(){}; console.log(typeof v === 'function'); // true
v = [1,2,3]; console.log(Array.isArray(v)); // true
```
### Emptiness
- `Undeclared`; **not declared**;
- `Uninitialized`: **declared** but **cannot be accessed** to; `Temporal Dead Zone`.
- `Undefined` **declared** but has **no value**;
- `null`: an **object** with value of **null**;
- `NaN`: a **number** but an **invalid** number;
### Special value
#### Special NaN
- **String to Number** by `Number()`
```javascript
var myAge = Number('0o46'); // octal number for 46
var myNextAge = Number('39'); // 39

// ''-> 0; '-0' -> 0; infinite -> NaN; -infinite -> NaN
var myCatsAge = Number('n/a'); // NaN

// coerce to number at first
myAge - "my son's age"; // NaN
```
- **Equality on NaN**
```javascript
myCatsAge === myCatsAge; // false!
```
- [**isNaN**](https://www.ecma-international.org/ecma-262/9.0/#sec-isnan-number): implicit coercion happens
```javascript
isNaN(myAge); // false
isNaN(myCatsAge) // true
isNaN("my son's age"); // true
```
- [**Number.isNaN()**](https://www.ecma-international.org/ecma-262/9.0/#sec-number.isnan): no coercion happens
```javascript
Number.isNaN(myCatsAge); // true
Number.isNaN("my son's age"); // false
```
- [**Strict Check**](https://www.ecma-international.org/ecma-262/9.0/#sec-samevalue)
```javascript
Object.is('hello', NaN) // false
```

- Don't use `undefined`, `null`, `false`, `-1`, `0` to replace `NaN`. `NaN` is the `only` proper representation of an `invalid` **number**.

#### Special -0
> `Zero` with **direction** `minus`

- **Weird Parts**
```javascript
let trendRate = -0;
console.log(trendRate === -0)  // true
console.log(trendRate.toString()) // "0" !
console.log(trendRate === 0) // true !
console.log(trendRate < 0) // false
console.log(trendRate > 0) // false
```
- [**Strict check**](https://www.ecma-international.org/ecma-262/9.0/#sec-samevalue)
```javascript
Object.is(trendRate, -0) // true
Object.is(trendRate, 0) // false;
```
- **Obtain Direction**
```javascript
console.log(Math.sign(-3)); //-1
console.log(Math.sign(3)); // 1
console.log(Math.sign(-0)); // -0!
console.log(Math.sign(0)); // 0!
```
- **Custom Direction Getter**
```javascript
function sign(v) {
  return v !== 0 ? Math.sign(v) : Object.is(v, -0) ? -1 : 1
}
sign(-3) // -1
sign(3) // 1
sign(-0) // -1
sign(0) // 1
```
### Constructor Time
- You should use `new` to build `constructor` when
```javascript
Object();
Array();
Function();
Date();
RegExp();
Error();
```
- You should avoid `new` when
```javascript
String();
Number();
Boolean()
```
### Commons
- Don't use MDN, use [ecma-262](https://www.ecma-international.org/ecma-262/9.0/#sec-tostring)
- Polyfill Pattern
```javascript
if (!Object.is) {
  Object.is = function ObjectIs() {
    ...
  }
}
```

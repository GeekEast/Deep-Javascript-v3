<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Abstract Operations](#abstract-operations)
  - [**ToPrimitive(hint)**](#toprimitivehint)
  - [ToString](#tostring)
  - [ToNumber](#tonumber)
  - [ToBoolean](#toboolean)
- [Explicit Coercion](#explicit-coercion)
  - [to string](#to-string)
  - [to number](#to-number)
  - [to boolean](#to-boolean)
- [Implicit Coercion](#implicit-coercion)
- [Corner Case](#corner-case)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Abstract Operations
> ToPrimitive, ToString, ToNumber, ToBoolean

#### [**ToPrimitive(hint)**](https://www.ecma-international.org/ecma-262/9.0/#sec-toprimitive)
> convert from `non-primitive` to `primitive`
- Hint: number
  - `valueOf()`
  - `toString()`
  - `valueOf()`
- Hint: string
  - `toString()`
  - `valueOf()`
  - `toString()`

#### [ToString](https://www.ecma-international.org/ecma-262/9.0/#sec-tostring)
- **Primitive Type**
```sh
null -> 'null'
undefined -> 'undefined'
true -> 'true'
false -> 'false'
3.14159 -> '3.14159'
0 -> '0'
-0 -> '0' # !
```

- **Weird Conversion from Array**
```sh
[] -> ''
[1,2,3] -> '1,2,3'
[null, undefined] -> ','
[[[],[],[]],[]] -> ',,,'
[,,,,] -> ',,,'
```

- **Weird Conversion from Object**
```sh
{} -> "[object Object]"
{a:2} -> "[object Object]"
```
- **Override `toString()` for `object`**
```sh
# overRide toString() method to return 'X'
{ toString(){return "X";}} -> "X"
```

#### [ToNumber](https://www.ecma-international.org/ecma-262/9.0/#sec-tonumber)
> = `ToPrimitive(number)`
- **Conversion from `primitive` type**
```sh
"" -> 0 # weird!
"0" -> 0 # not weird!
" 009 " -> 9
"3.14159" -> 3.14159
"0." -> 0
".0" -> 0
"." -> NaN  #!
"0xaf" -> 175
false -> 0
true -> 1
null -> 0 #!
undefined -> NaN
```
- **Conversion from `non-primitive` type**
> will invoke the `toPrimitive(Number)` abstract operaiton

```sh
[""] -> 0
["0"] -> 0
["-0"] -> -0
[null] -> 0
[undefined] -> 0
[1,2,3] -> NaN
[[[[]]]] -> 0
{..} -> NaN
```
- **Override `valueOf()` for object**
```javascript
{ valueOf(){return 3}} -> 3
```
- **Operation** `valueOf()`
```javascript
valueOf(){return this;}
```

#### [ToBoolean](https://www.ecma-international.org/ecma-262/9.0/#sec-toboolean)
> ToBoolean only does `look up`, do **not** invode any other `abstract operations`

- **False**
  - `""`
  - `0, -0`
  - `null`
  - `NaN`
  - `undefined`
  - `false`
- **True**
  - `"foo"`
  - `23`
  - `{a:'1'}`
  - `[1,3]`
  - `function(){...}`
  - `true`
  - ...
### Explicit Coercion
#### to string
- **use `${}`**
```javascript
const y = 1
const x = `a asdasdasd ${y}` // be will be coercied to string implicitly
```
- **use `+`**
```javascript
let b = 1;
let x = "a" + b // be will be coercied to string implicitly
```
- **use `Array.prototype.join()`**
```javascript
[1,2,3].join("")
```
- **use `toString()` of a non-primitive type**
```javascript
const x = {}
x.toString();
```
- **use `String()`: Recommended**
```javascript
String(1)
```
#### to number
- **use `+`**
```javascript
+"324" // wiil be converted to a number
```
- **use `Number()`: Recommended**
```javascript
Number("123"); 
```
#### to boolean
- **use `!!`**
```javascript
!!a.b
```
- **use `Boolean()`**
```javascript
Boolean("")
```

### Implicit Coercion
> Boxing: Wrap primitive types up as Objects
- Just let the boxing happens which has performance benefits.
```javascript
let a = "abc";
a.length; // will be boxed as an object
a.toUpperCase() // will be boxed as an object
```

### Corner Case
```javascript
Number("") // 0
Number(" \t\n") //0
Number(null) //0
Number(NaN) //NaN
Number([]) //0
Number([1,2,3]) // ！NaN
Number([null]) // 0
Number({}) // NaN

String(-0) // "0"
String(null) // "null"
String(undefined) // "undefined"
String( [null] ) // ""
String( [undefined] ) // ""

Boolean( new Boolean(false)); true // the object exists

Number(true) // 1
Number(false) //0

1<2<3 // true
(1<2)<3
1<3  // true

var a = '';
Number(a) // 0
a = '  \t\n'
Number(a) //0
```
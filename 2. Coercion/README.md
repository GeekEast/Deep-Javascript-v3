<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Abastract Operation](#abastract-operation)
  - [ToPrimitive(hint)](#toprimitivehint)
  - [toString](#tostring)
    - [Primitive Type](#primitive-type)
    - [Weird Conversion from Array](#weird-conversion-from-array)
    - [Weird Conversion from Object](#weird-conversion-from-object)
    - [Override `toString()` for `object`](#override-tostring-for-object)
  - [toNumber](#tonumber)
    - [from `primitive` type](#from-primitive-type)
    - [from `non-primitive` type](#from-non-primitive-type)
    - [Override valueOf() for object](#override-valueof-for-object)
  - [toBoolean](#toboolean)
    - [False](#false)
    - [True](#true)
- [Explicit Coercion](#explicit-coercion)
    - [to string](#to-string)
    - [to number](#to-number)
    - [to boolean](#to-boolean)
- [Boxing](#boxing)
- [Corner Cases](#corner-cases)
- [Philosophy](#philosophy)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Abastract Operation
- Type conversion
- Abstract Operation
  - `toPrimitive`
  - `toString`
  - `toNumber`
  - `toBoolean`

### ToPrimitive(hint)
- convert from `non-primitive` to `primitive`
- Hint: number
  - `valueOf()`
  - `toString()`
  - `valueOf()`
- Hint: string
  - `toString()`
  - `valueOf()`
  - `toString()`

### toString
#### Primitive Type
```sh
null -> 'null'
undefined -> 'undefined'
true -> 'true'
false -> 'false'
3.14159 -> '3.14159'
0 -> '0'
-0 -> '0' #!
```

#### Weird Conversion from Array
```sh
[] -> ''
[1,2,3] -> '1,2,3'
[null, undefined] -> ','
[[[],[],[]],[]] -> ',,,'
[,,,,] -> ',,,'
```

#### Weird Conversion from Object
```sh
{} -> "[object Object]"
{a:2} -> "[object Object]"
```
#### Override `toString()` for `object`
```sh
# overRide toString() method to return 'X'
{ toString(){return "X";}} -> "X"
```

### toNumber
- = `ToPrimitive(number)`

#### from `primitive` type
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
#### from `non-primitive` type
- will invoke the `toPrimitive(Number)` abstract operaiton
- `valueOf()`
```javascript
valueOf(){return this;}
```
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
#### Override valueOf() for object
```javascript
{ valueOf(){return 3}} -> 3
```

### toBoolean
- toBoolean only does `look up`, do **not** invode any other `abstract operations`
#### False
  - `""`
  - `0, -0`
  - `null`
  - `NaN`
  - `undefined`
  - `false`
#### True
  - `"foo"`
  - `23`
  - `{a:'1'}`
  - `[1,3]`
  - `function(){...}`
  - `true`
  - ...

## Explicit Coercion
#### to string
- use `${}`
```javascript
const y = 1
const x = `a asdasdasd ${y}` // be will be coercied to string implicitly
```
- use `+`
```javascript
let b = 1;
let x = "a" + b // be will be coercied to string implicitly
```
- use `Array.prototype.join()`
```javascript
[1,2,3].join("")
```
- use `toString()` of a non-primitive type
```javascript
const x = {}
x.toString();
```
- **use `String()`**
```javascript
String(1)
```
#### to number
- use `+`
```javascript
+"324" // wiil be converted to a number
```
- **use `Number()`**
```javascript
Number("123"); 
```
#### to boolean
- use `!!`
```javascript
!!a.b
```
- use `Boolean()`
```javascript
Boolean("")
```

## Boxing 
> from primtive to an object
- Kyle doesn't recommend something like `new String("abc")`
- Just let the boxing happens which has performance benefits
```javascript
let a = "abc";
a.length; // will be boxed as an object
a.toUpperCase() // will be boxed as an object
```

## Corner Cases
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
```
## Philosophy
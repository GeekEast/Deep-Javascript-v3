<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Scope](#scope)
  - [Compiler vs Interpreter](#compiler-vs-interpreter)
  - [How](#how)
  - [Left and Right Position](#left-and-right-position)
    - [Compile Time](#compile-time)
    - [Run Time](#run-time)
    - [parameter vs argument](#parameter-vs-argument)
  - [Lexical Scope](#lexical-scope)
  - [More Example](#more-example)
- [Function expression](#function-expression)
  - [Function declaration](#function-declaration)
  - [Function Expression](#function-expression)
    - [Named Function Expression](#named-function-expression)
    - [Anonymous Function Expression](#anonymous-function-expression)
    - [Prefer the Named Function Expression](#prefer-the-named-function-expression)
  - [Arrow Functions](#arrow-functions)
  - [Function Types Hierarchy](#function-types-hierarchy)
  - [Immediately Invoked Function Expression](#immediately-invoked-function-expression)
- [Block Scoping](#block-scoping)
  - [IIFE](#iife)
  - [Using Block to create a new scope by using `const` or `let`](#using-block-to-create-a-new-scope-by-using-const-or-let)
  - [`let` vs `var`](#let-vs-var)
  - [`const`](#const)
- [Hoisting](#hoisting)
  - [Hoisting as described](#hoisting-as-described)
  - [Hoisting in Reality](#hoisting-in-reality)
  - [Hoist on function declaration](#hoist-on-function-declaration)
  - [`let` doesn't hosit -> False](#let-doesnt-hosit---false)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Scope
- Nested Scope
- Hoisting(提升)
- Closure（闭包）
- Modules（模块）

### Compiler vs Interpreter
- `Compilter`: compile source code to machine code and run
- `Interpreter`: interpret and run the code at the same time
- [Reference](https://www.zhihu.com/question/21486706)
> Javascript is **not** `interpreted` langauage. It's a `compiled` language with `two pass processing`. One is compling the code and declare all the **scope** and **left hand things**. Another is evaluating the **right hand things** and run the code eventually.

### How
- [Step](https://frontendmasters.com/courses/deep-javascript-v3/lexical-scope-review/)
```javascript
// declare teacher in global scope
var teacher = 'kyle'

// create another scope within the global scope
function otherClass() {
  // declare teacher in otherClass scope
  var teacher = 'Suzy';
  // it doesn't have any effect on our scopes
  console.log("Welcome");
}

// create another scope within the global scope
function ask(){
  // declare question in ask scope
  var question = 'Why?';
  // call the question in the ask scope
  console.log(question);
}
// the compiling stage for create buckets and marbles has been done
// then will be handed over to the v8 and then run the code

otherClass();
ask();
```
- **Shadowing**: have two variables in **different** scopes with the **same** name
> All the scopes are determined at `compile` time rather than `run` time. 


### Left and Right Position
- **Left**: the variable to be signed a value to
- **Right**: the value to be assigned to a varibale.
#### Compile Time
- declare the left side things
#### Run Time
- execute the right side things
#### parameter vs argument
- **parameter**: left side thing for obtaining values
- **argument**: right side thing for extracting values

### Lexical Scope
- AkA: static scope
- The scope is decided during the **compile** stage
```c
void fun()
{
    int x = 5;
    void fun2()
    {
        printf("%d", x);
    }
}
```
- dynamic scope
- The scope is decided in the **run** stage, depends on the call chain of method.
```c
void fun()
{
    printf("%d", x);
}

void dummy1()
{
    int x = 5;
    fun();
}

void dummy2()
{
    int x = 10;
    fun();
}
```

### More Example
- When strict mode off
```javascript
var teacher = "kyle";

function otherClass() {
  teacher = "Suzy";
  // will automatcially declare a variable in global scope
  topic = "React";
  console.log("Welcome!");
}

otherClass();

teacher; // Suzy
topic; // "React"
```
- When strict mode on
```javascript
"use strict";
var teacher = "kyle";

function otherClass() {
  teacher = "Suzy";
  // will throw a ReferenceError
  topic = "React";
  console.log("Welcome!");
}

otherClass();

teacher; // Suzy
topic; // "React"
```
- Nested Scope
  - Javascript will do `upwards` binding -> **elevator**
  - Javascript won't do `downwards` binding
```javascript
var teacher = "kyle";
function otherClass() {
  var teacher = "Suzy";
  function ask(question){
    console.log(teacher, question);
  }
  ask("Why?");
}

otherCkass();
ask("???") // referenceError
```
## Function expression

### Function declaration
- function teacher is declared in **global** scope
```javascript
function teacher() {/*...*/}
```
### Function Expression
- myTeacher is declared in the **global** scope
- but function `anotherTeacher` is declared in the **myTeacher** scope
```javascript
var myTeacher = function anotherTeacher() {
  console.log(anotherTeacher);
}
```
#### Named Function Expression
```javascript
var keyHandler = function keyHandler(){}
```
#### Anonymous Function Expression
```javascript
var clickHandler = function() {}
```
#### Prefer the Named Function Expression
- Reason 1: Self-reference for **recursion**
- Reason 2: More **debuggable** stack traces
- Reason 3: More **self-documenting** code

### Arrow Functions
- Not recommended by Kyle...
```javascript
const go = () => {/*..*/}
```
### Function Types Hierarchy
**Function Declaration** `>` **Named Function Express** `>` **Anonymous Function Expression**

### Immediately Invoked Function Expression
```javascript
var teacher = 'Kyle';
// IIFE
(function anotherTeacher(){
  var teacher = "Suzy";
  console.log(teacher);
})();
console.log(teacher);
```
- normal way of doing async/await with try/catch
```javascript
var teacher;
try {
  teacher = fetchTeacher()
}catch (err) {
  return 'kyle';
}
```
- make assignment happens only once
```javascript
var teacher = (
  try {
    return fetchTeacher();
  }catch(err){
    return 'kyle';
  }
)()
```

## Block Scoping
### IIFE
```javascript
var teacher = 'Kyle';
(function anotherTeachter(){
  var teacher = 'Suzy';
  console.log(teacher)
})();

console.log(teacher);
```
### Using Block to create a new scope by using `const` or `let`
> Not all `{}` creates scopes if they didn't use `const` or `let`
```javascript
var teacher = "Kyle";
// the same way to avoid name collision
{
  let teacher = "Suzy"; // have const or let is the necessary to make it a as a scope
  console.log(teacher)
}

console.log(teacher);
```
### `let` and `const` shows this is a new scope!
```javascript
function diff(x,y){
  if (x > y){
    // let make if statement as a new scope
    let tmp = x;
    x = y;
    y = tmp;
  }
  return y-x;
}
```
### `let` vs `var`
- use `let` in block scope
- use `var` for reusing, `let` cannot do the same thing
```javascript
function lookUpRecord(searchStr){
  try {
    // var shows this is not block scope! id belongs to function scope!
    var id = getRecord( searchStr );
  } catch (err) {
    var id = -1;
  }
  return id; // will not be undefined.
}
```
### `const`
- only use `const` for **primitive immutable** values, just like `final` in Java
- For **non-primitive** types, `const` means this variable cannot be **reassigned**. But it can be changed. So you don't have to use `const`.
- use `Object.freeze()` to make an object final in `strict-mode`
 

## Hoisting
- Hoisting doesn't exist in Javascript Engine
- Hoisting is a convention that we have made up to discuss the idea of lexical scope without thinking about lexical scope.
### Hoisting as described
```javascript
student;
teacher;
student = 'you';
teacher = 'kyle';
```
- hositing to top
```javascript
var student;
var teacher;
student = 'you';
teacher = 'kyle';
```
### Hoisting in Reality
- javascript engine does not re-organize your code and do the hoisting
- javascript only parse the code in a different way

### Hoist on function declaration
```javascript
teacher();
otherTeacher();

function teacher() {
  return 'Kyle';
}

var otherTeacher = function() {
  return 'Suzy';
}
```
- What happened behind?
```javascript
function teacher() {
  return 'Kyle';
}

var otherTeacher;

teacher();
otherTeacher(); // TypeError

otherTeacher = function() {
  return "Suzy";
}
```

### `let` doesn't hosit -> False
- `let` and `const` will hoist but to be **unintialized**
```javascript
{
  teacher = 'Kyle'; // TDZ error
  let teacher;
}
```
```javascript
function foo () {
  console.log(a);
}
let a = 20;
foo();  // This is perfectly valid
```
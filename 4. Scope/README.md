<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Scope](#scope)
  - [Compiler vs Interpreter](#compiler-vs-interpreter)
  - [How Compiler Works](#how-compiler-works)
  - [Function Types](#function-types)
  - [IIFE](#iife)
  - [Block Scoping](#block-scoping)
  - [Hoisting](#hoisting)
- [Commons](#commons)
  - [Terms](#terms)
  - [Lexical Scope](#lexical-scope)
  - [Dynamic scope](#dynamic-scope)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Scope
#### Compiler vs Interpreter
- [Reference](https://www.zhihu.com/question/21486706)
- `Compilter`: compile source code to machine code and run
- `Interpreter`: interpret and run the code at the same time
> Javascript is **not** `interpreted` langauage. It's a `compiled` language with `two pass processing`. One is compling the code and declare all the **scope** and **left hand things**. Another is evaluating the **right hand things** and run the code eventually.

#### [How Compiler Works](https://frontendmasters.com/courses/deep-javascript-v3/lexical-scope-review/)
- **Simple**
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

<!-- more -->

- **Strict Mode Off**
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
- **Strict Mode On**
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
- **Nested Scope**
> Search from inner to outer not vice versa.
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
#### Function Types
- **Function Declaration**
> function teacher is declared in **global** scope
```javascript
// function teacher is declared in global scope
function teacher() {...}
```
- **Named Function Expression**
> myTeacher is declared in the **global** scope but function `anotherTeacher` is declared in the **myTeacher** scope
```javascript
var myTeacher = function anotherTeacher() {
  console.log(anotherTeacher);
}
```
- **Anonymous Function Expression**
```javascript
var clickHandler = function() {}
```
- **Arrow Function**
```javascript
const go = () => {/*..*/}
```
- **Function Types Hierarchy**
  - **Top 1**. (Names) Function `Declaration`
  - **Top 2**. Named Function `Expression`
  - **Top 3**. `Anonymous` Function Expression

- **Prefer the Named Function Expression**
  - Reason 1: Self-reference for **recursion**
  - Reason 2: More **debuggable** stack traces
  - Reason 3: More **self-documenting** code


#### IIFE
> Immediately Invoked Function Expression
- **Simple**
```javascript
var teacher = 'Kyle';
// IIFE
(function anotherTeacher(){
  var teacher = "Suzy";
  console.log(teacher);
})();
console.log(teacher);
```
- **normal way of doing async/await with try/catch**
```javascript
var teacher;
try {
  teacher = fetchTeacher()
}catch (err) {
  return 'kyle';
}
```
- **make assignment happens only once**
```javascript
var teacher = (
  try {
    return fetchTeacher();
  }catch(err){
    return 'kyle';
  }
)();
```

#### Block Scoping
- **Create a new Scope**
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
- **Hints!**
> `let` and `const` shows this is a new scope!
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
- **`let` vs `var`**
> - use `let` in `block scope`
> - use `var` for `reusing`, because it can be level up to global.
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
- **`const` Usage**
>  - only use `const` for **primitive immutable** values, just like `final` in Java
> - For **non-primitive** types, `const` means this variable cannot be **reassigned**. But it can be changed. So you don't have to use `const`.
> - use `Object.freeze()` to make an object final in `strict-mode`


#### Hoisting
> - javascript engine does **not** re-organize your code and do the **hoisting**
> - javascript only **parse** the code in a different way

- **Variable Declaration**
```javascript
student;
teacher;
student = 'you';
teacher = 'kyle';
```
- **After `Hoisting`**
```javascript
var student;
var teacher;
student = 'you';
teacher = 'kyle';
```
- **Function Declaration**
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
- **After `Hoisting`**
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
- **`let` and `const` on hoisting**
```javascript
{
  teacher = 'Kyle'; // TDZ error
  let teacher;
}
```
- `let` **hoisted**
```javascript
function foo () {
  console.log(a);
}
let a = 20;
foo();  // This is perfectly valid
```

### Commons

#### Terms
- **Shadowing**: have two variables in **different** scopes with the **same** name

- **Left and Right Position**
  - **Left**: the variable to be signed a value to
  - **Right**: the value to be assigned to a varibale.
- **Compile Time**
  - declare the left side things  
- **Run Time**
  - execute the right side things
- **parameter vs argument**
  - **parameter**: left side thing for obtaining values
  - **argument**: right side thing for extracting values



#### Lexical Scope
- AkA: **static scope**
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
#### Dynamic scope
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
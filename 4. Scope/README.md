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
> The first one is called static because it can be **deduced at compile-time**, the second is called **dynamic** because the outer scope is dynamic and depends **on the chain call of the functions**.

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

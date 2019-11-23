<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Object](#object)
  - [`this`](#this)
    - [! Dynamic Scope](#-dynamic-scope)
    - [Using `this`](#using-this)
    - [Namespace Pattern](#namespace-pattern)
    - [Namespace Pattern: Implicit Binding](#namespace-pattern-implicit-binding)
    - [`call()`](#call)
    - [`bind()`](#bind)
    - [Summary](#summary)
  - [`new`](#new)
    - [Procedure](#procedure)
  - [Fallback](#fallback)
  - [Precedence](#precedence)
  - [Arrow Function](#arrow-function)
    - [`!this`](#this)
    - [Is Object Scope?](#is-object-scope)
    - [`super` keyword](#super-keyword)
    - [`this` still dynamic](#this-still-dynamic)
    - [Save Class `this`](#save-class-this)
  - [](#)
- [Guesses](#guesses)
  - [difference between `var x` amd `x`](#difference-between-var-x-amd-x)
  - [Interview Question](#interview-question)
  - [One interesting thing](#one-interesting-thing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Object

### `this`
> A function's this references the **execution context** for that call, determined entirely by **how the function was called**
- Execution Context: **Dynamic Scoping**.

#### ! Dynamic Scope
- `Dynamic Scoping` doesn't work in **Javascript**.
```javascript
var teacher = 'Kyle';
function ask(question){
  console.log(teacher, question);
}

function otherClass(){
  // won't output Suzy but Kyle
  var teacher = "Suzy";
  ask("Why?")
}
otherClass();
```
#### Using `this`
- **Context** is actually an **object**
```javascript
function ask(question){
  console.log(this.teacher, question);
}

function otherClass(){
  let myContext = {
    teacher: 'K'
  }
  ask.call(myContext, "Why?")
}

// ask is called by otherClass within the global scope
otherClass();
```
#### Namespace Pattern
```javascript
var workshop = {
  teacher: 'Kyle',
  ask(question){
    // this points to workshop.
    console.log(this.teacher, question);
  }
}

workshio.ask("What is implicit binding?");
```

#### Namespace Pattern: Implicit Binding
- `this` is determined during run time.
- `Implicit Binding` is used for **code reuse**.
```javascript
function ask(question){
  console.log(this);
  console.log(this.teacher, question);
}

var workshop1 = {
  teacher: 'Kyle',
  ask: ask
}

var workshop2 = {
  teacher: 'Suzy',
  ask: ask
}

workshop1.ask("How do I share a method?");
workshop2.ask("How do I share a method?");
```
#### `call()`
```javascript
function ask(question){
  console.log(this.teacher, question);
}

var workshop1 = {
  teacher: 'Kyle'
  // don't have to define ask here
}

var workshop2 = {
  teacher: 'Suzy',
  // don't have to define ask here
}

ask.call(workshop1, "Can I explicitly set context?");
ask.call(workshop2, "Can I explicitly set context?");
```

#### `bind()`
```javascript
var workshop = {
  teacher: 'Kyle',
  ask(question){
    console.log(this.teacher, question);
  }
}
// ask is called in the global context
setTimeout(workshop.ask, 10, "Lost this?");
// ask is called in the workshop context
setTimeout(workshop.ask.bind(workshop), 10, "Hard bound this?");
```
#### Summary
- If you use so many `this` with `bind`, `call` or `apply`, you use it the hard way.
- You can also use the `lexical scope` with **closure** to reference data for **predictability** beside `hard binding`.
- You should really enjoy the **flexibity** of `this`, which is the purpose of creating it.
### `new`
- It is **not** for doing **constructor** of classes.
- It's created to call a function with a **whole new empty object** as the **execution context**.
```javascript
function ask(question){
  console.log(this.teacher, question);
}

// ask will be called within an empty obejct as the execution context
var newEmptyObject = new ask("What is 'new' doing here?")
```
- The same with `call()`
```javascript
function ask(question){
  console.log(this.teacher, question);
}

// ask will be called within an empty obejct as the execution context
ask.call({}, "hello world");
```
- `new` means **new empty execution context**.
#### Procedure
- Create a brand new empty object
- `* Link that object to another object` - `prototype object`
- Call function with this set to the new object
- If function does not return an **object**, assume return of **this**.

### Fallback
- people prefer the `strict-mode` to prevent auto-creating the `global` object
```javascript
var teacher = 'Kyle';
function ask(question){
  // Kyle
  console.log(this.teacher, question);
}

function askAgain(question){
  "use strict";
  // undefined
  console.log(this.teacher, question);
}

// this is not workshop.ask, doesn't have any context object
// so we use the global as the context
ask("What's hte non-strict-mode default?");

// but in strict-mode, the default context is undefined
askAgain("What's the strcit-mode default?");
```

### Precedence
- new
- call() or apply(), bind()
- context object for example `workshop.ask() `
- Default binding (except `strict mode`)
```javascript
var workshop = {
  teacher: 'Kyle',
  ask: function ask(question){
    console.log(this.teacher, question);
  }
}
new (workship.ask.bind(workshop))("What does this do?");
```
### Arrow Function
#### `!this`
- There is no this in arrow function
- Will `lexically` resolve the variable from **inner** to **outer** `scope`
- You can't use `new` for an arrow function, because it's `not` **hard-bound** and doesn't define `this` keyword.
```javascript
var workshop = {
  teacher: 'Kyle',
  ask(question){
    setTimeout(() => {
      console.log(this.teacher, question)
    }, 100);
  }
}

workshop.ask("Is this lexical 'this'?")
```
#### Is Object Scope?
- But How to identify a scope
```javascript
var workshop = {
  teacher: 'Kyle',
  ask: (question) => {
    console.log(this.teacher, question);
  }
}
// the scope outside ask is the global, since object does not define scope.
workshop.ask("What happened to 'this'?");
// arrow function doesn't have this keyword -> undefined
workshop.ask.call(workshop, "Still no 'this'?");
```
> We recommend using the `lexical` way by arrow function.
### `Class` Keyword
- `Class` keyword is a **syntax sugar** for a **layer** on top of the `prototype system`.
#### class example
```javascript
class Workshop {
  constructor(teacher){
    this.teacher = teacher;
  }
  ask(question){
    console.log(this.teacher, question);
  }
}

var deepJS = new Workshop("Kyle");
var reactJS = new Workshop("Suzy");

deepJS.ask("asd");
reactJS.ask("asdss")
```
#### Inheritance
```javascript
class Workshop {
  constructor(teacher){
    this.teacher = teacher;
  }
  ask(question){
    console.log(this.teacher, question);
  }
}

class AnotherWorkshop extends Workshop {
  // you don't have to define other methods already in the parent class.
  speakUp(msg){
    this.ask(msg);
  }
}

var JSRecentParts = new AnotherWorkshop("Kyle");
JSRecentParts.speakUp("Are classes getting better?");
```
#### `super` keyword
```javascript
class Workshop {
  constructor(teacher){
    this.teacher = teacher;
  }
  ask(question){
    console.log(this.teacher, question);
  }
}

class AnotherWorkshop extends Workshop {
  ask(msg){
    // override also called shadowing
    super.ask(msg.toUpperCase())
  }
}

var JSRecentParts = new AnotherWorkshop("Kyle");
JSRecentParts.speakUp("Are classes getting better?");
```
#### `this` still dynamic
```javascript
class Workshop {
  constructor(teacher){
    this.teacher = teacher;
  }

  ask(question){
    console.log(this.teacher, question);
  }
}

var deepJS = new Workshop("Kyle");
setTimeout(deepJS.ask, 100, "Still losing 'this'?");
```
#### Save Class `this`
```javascript
class Workshop {
  constructor(teacher){
    this.teacher = teacher;
    // this will create ask to any instance
    this.ask = question => console.log(this.teacher, question);
  }

  // this will create ask in prototype
  // ask(){

  // }
}

var deepJS = new Workshop('Kyle');
setTimeout(deepJS.ask, 100, "Is 'this' fixed?");
```
### 

## Guesses
### difference between `var x` amd `x`
- `x` will be attached to execution context
- `var x` will not be

### Interview Question
```javascript
var x = "1"; 
var y = 1; 
a = x + y;
console.log(a);
console.log(x == y);
console.log(x === y);
```
```javascript
var j =0;
for(var i=0; i<10; i++){
  // console.log(i);
setTimeout(function(){
   j +=i;
},i*1000)
}
```

### One interesting thing
- no new keyword
- no call, apply, bind
- no object context like `asd.ask()`
- **yes, default binding, is the global; if strict mode, undefined binding.**
```javascript
'use strict'
var teacher = 'Kyle';
function ask(question){
  console.log(this);
  console.log(this.teacher, question);
}

function otherClass(){
  ask("why")
}

otherClass();
```
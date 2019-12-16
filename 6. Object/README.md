<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [`this`](#this)
  - [Scope and Closure](#scope-and-closure)
  - [Object and `this`](#object-and-this)
  - [Namespace Pattern](#namespace-pattern)
  - [Namespace Pattern: Implicit Binding](#namespace-pattern-implicit-binding)
  - [Hard binding](#hard-binding)
- [`new`](#new)
  - [How it works](#how-it-works)
- [Default Binding](#default-binding)
- [Precedence in `this`](#precedence-in-this)
- [Arrow Function](#arrow-function)
  - [`!this`](#this)
  - [Arrow Function with `this`](#arrow-function-with-this)
- [Class](#class)
  - [Example](#example)
  - [Origin](#origin)
  - [Inheritance](#inheritance)
  - [Alternative](#alternative)
  - [`super` keyword](#super-keyword)
  - [Constructor](#constructor)
- [Issues](#issues)
  - [Why `Kyle` is not in the global object?](#why-kyle-is-not-in-the-global-object)
  - [How to identify Scope?](#how-to-identify-scope)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


### `this`
> A function's this references the **execution context** for that call, determined entirely by **how the function was called**

#### Scope and Closure
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

#### Object and `this`
> `Prototype chaining` happens after `this`
```javascript
Object.prototype.teacher = 'kyle';
function ask(question){
  console.log(this.teacher, question);
}

function otherClass(){
  var teacher = "Suzy";
  ask("Why?")
}
otherClass();
```
<!-- more -->

#### with `this` and `call`
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
> - `this` is determined during run time.
> - `Implicit Binding` is used for **code reuse**.
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
#### Namespace to Explicit binding
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
#### Hard binding
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

### `new`
> - It's created to call a function with a **whole new empty object** as the **execution context**.
> - `new` means **new empty execution context**.
#### Sample
```javascript
function ask(question){
  console.log(this.teacher, question);
}

// ask will be called within an empty obejct as the execution context
var newEmptyObject = new ask("What is 'new' doing here?")
```
#### Alternative
- The same with `call()`
```javascript
function ask(question){
  console.log(this.teacher, question);
}

// ask will be called within an empty obejct as the execution context
ask.call({}, "hello world");
```
#### How it works
- Create a brand new empty object
- `* Link that object to another object` - `prototype object`
- Call function with this set to the new object
- If function does not return an **object**, assume return of **this**.
  

### Default Binding
- no new keyword
- no call, apply, bind
- no object context like `asd.ask()`
- **yes, default binding, is the global; if strict mode, undefined binding.**
```javascript
global.teacher = 'Kyle'
function ask(question){
  // this referes to global object
  console.log(this.teacher, question);
}

function askAgain(question){
  "use strict";
  // this undefined
  console.log(this.teacher, question);
}

// this is not workshop.ask, doesn't have any context object
// so we use the global as the context
ask("What's hte non-strict-mode default?");

// but in strict-mode, the default context is undefined when the execution context is the global object.
askAgain("What's the strcit-mode default?");
```

### Precedence in `this`
- new
- call() or apply(), bind()
- context object for example `workshop.ask()`(only bind to the nearest object)
- Default binding (except `strict mode`)

```javascript
var workshop = {
  teacher: 'Kyle',
  ask: function ask(question){
    console.log(this.teacher, question);
  }
}
new (workship.ask.bind(workshop))("What does this do?"); // undefind
```
### Arrow Function
#### `!this`
> - will find the nearest function x lexicially, and use the `this` of x
> - do `lexically` searching at first and then use the **normal** `this` rules.
> - You can't use `new` for an arrow function, because it doesn't define `this` keyword.
#### Function Declaration without `this`
```javascript
var workshop = {
  teacher: 'Kyle',
  ask(question){
    setTimeout(
      function() {
        // undefined because object doesn't automatically create scope
        console.log(teacher,question);
      }
    , 100);
  }
}

// Kyle Is this lexical 'this'?
workshop.ask("Is this lexical 'this'?")
```

#### Function Declaration with `this`
```javascript
Object.prototype.teacher = 'James';
var workshop = {
  teacher: 'Kyle',
  ask(question){
    setTimeout(
      function() {
        // this refers to Timeout, then tract the prototype chain
        console.log(this.teacher,question);
      }
    , 100);
  }
}

// James Is this lexical 'this'?
workshop.ask("Is this lexical 'this'?")
```

#### Arrow Function with `this`
> `this` in Arrow function behaves **lexically**, but still relates to `this` (not its own `this`);
```javascript
var workshop = {
  teacher: 'Kyle',
  ask(question){
    setTimeout(() => {
      console.log(this);
    }, 100);
  }
}

// Kyle Is this lexical 'this'?
workshop.ask("Is this lexical 'this'?")
```
- the `outside scope` is the `ask` function
- the `outside scope` is not the setTimeout because there it encloses with `()` rather than `{}`
  - But not all {} are scopes - Object{}
  - function()`{}` is **scope**.
 - **this** of `ask` function is the workshop object.
> it still traces **this**, but `not` its own.

#### Arrow Function without `this`
> - the outside scope is `ask`, no teacher
> - the outside scope is `global`, no teacher
> - `undefined`.
```javascript
var workshop = {
  teacher: 'Kyle',
  ask(question){
    setTimeout(
      () => {
      console.log(teacher);
    }
    , 100);
  }
}

workshop.ask('What?')
```

### Class
> `Class` keyword is just a **syntax sugar** for a **layer** on top of the `prototype system`.

#### Example
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
#### Origin
```javascript
function Workshop(teacher){
  this.teacher = teacher;
}

Workshop.protoype.ask = function(question){
  console.log(this.teacher, question);
}

var deepJS = new Workshop('Kyle');
var reactJS = new Workshop('Jame');
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
#### Alternative
```javascript
function Workshop(teacher){
  this.teacher = teacher;
}

Workshop.protoype.ask = function(question){
  console.log(this.teacher, question);
}

// link constructor
function AnotherWorkshop(teacher){
  Workshop.call(this,teacher);
}
// link prototype
Another.prototype = Object.create(Workshop.prototype);

// add new method
AnotherWorkshop.prototype.speakUp = function(msg){
  this.ask(msg.toUppderCase());
}

// the same thing
var JSRecentParts = new AnotherWorkshop("Kyle");
JSRecentParts.speakUp("Are classes getting better?");
```

#### `super` keyword
> `super` is detemined during complile time - lexically scoped
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

#### `this` still dynamic in Class
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

#### Constructor
```javascript
class Workshop {
  constructor(teacher){
    this.teacher = teacher;
    // this will create ask() to any instance (execution context)
    this.ask = question => console.log(this.teacher, question);
  }

  // this will create ask in prototype
  // ask(){}
}

var deepJS = new Workshop('Kyle');
setTimeout(deepJS.ask, 100, "Is 'this' fixed?");
```

### Issues
#### Why `Kyle` is not in the global object?
```javascript
// Object.prototype.teacher = 'kyle';
global.teacher = 'James'
var teacher = 'Kyle';
function ask(question){
  console.log(this.teacher, question);
}

function otherClass(){
  var teacher = "Suzy";
  // the object context is not otherClass()
  ask("Why?")
}
otherClass();
```
> - `global object `is different from `global scope`
> - `closure` can happen both on **scope** or **object** perspectives
> - `this` can **only** happen in the **object** perspective
> - `var teacher` is defined in the **global** scope
#### Scope and Object
- `teacher` trace `lexical scope`
- `this.teacher` trace **execution context** and then **prototype chain**

#### How to identify Scope?
```javascript
var workshop = {
  teacher: 'Kyle',
  ask: (question) => {
    console.log(this.teacher, question);
  }
}
// the scope outside ask is the global, since object does not define scope.
console.log(workshop.ask("What happened to 'this'?"))
// arrow function doesn't have this keyword -> undefined
workshop.ask.call(workshop, "Still no 'this'?");
```
- `this`'s scope will the be **global object** rather than **workshop** because `object is not a scope`
- global **scope** doesn't have `this`, so by default it is `{}`;
- `Only` **function scope** has `this`

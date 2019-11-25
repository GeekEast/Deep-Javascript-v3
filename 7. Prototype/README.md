<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Prototype](#prototype)
  - [Old School](#old-school)
  - [Prototype Chain](#prototype-chain)
  - [Dunder Prototype](#dunder-prototype)
  - [Inheritance](#inheritance)
  - [Class Inheritanace](#class-inheritanace)
- [Issues](#issues)
  - [Override Binding](#override-binding)
  - [`prototype` on Arrow Function](#prototype-on-arrow-function)
  - [Shadow Prototypes](#shadow-prototypes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Prototype
> The **prototype** system follows the **delegation** pattern rather than the traditional `class` pattern
#### Constructor Call
- Objects are created by `contructor` call (using `new`)
- Constructor is used to producing instances that link properties and methods define in the constructor and link to prototype.
- 2 Kinds of code reuse:
  - `Non-static`: One happens in the `constructor`: copy `values`
  - `Static`: Another happens in the `prototype chain`: copy `references`


#### Old School
```javascript
function Workshop(teacher){
  this.teacher = teacher;
}

Workshop.prototype.ask = function(question) {
  console.log(this.teacher, question);
}

var deepJS = new Workshop("Kyle");
var reactJS = new Workshop("Suzy");

// deepJS doesn't have the ask method, how can he call it?
// by default, if there is no property existing in current object, it will go up along the prototype chain
deepJS.ask("Deep JS");
reactJS.ask("React JS"); 
```
<!-- more -->

#### Prototype Chain
- `contructor` is only a name, it's not like the constructor in other programming language, like `java`
- **Contructor** function has only `one` instance, **prototype** only has `one` instance, but the objects, essentially the `execution context` has `many`.
>  对象创建的过程，其实是使用同一构造器，创建不同execution context的过程。

<div style="text-align:center; margin:auto"><img src="https://geekeaskblogpics.s3-ap-southeast-2.amazonaws.com/posts/2019-11-24-01-39-47.png"></div>

#### Dunder Prototype
```javascript
function Workshop(teacher){
  this.teacher = teacher;
}

Workshop.prototype.ask = function(question){
  console.log(this.teacher, question);
}

var deepJS = new Workshop('Kyle');

deepJS.constructor === Workshop; // true
deepJS.__proto__ === Workshop.prototype; // true
Object.getPrototypeOf(deepJS) === Workshop.prototype; // true
```
> - deepJS doesn't have a property called `constructor`, so it goes up to its **prototype** and then it could find it, which is the **Workshop** function
> - `deepJS` doesn't have the **dunder property**, so it goes up its `prototype`, but found nothing called `__proto__`, so it continues to go up to the **Object's prototype** and then found it! But, unexpectedly ,the `__proto__` is actually a **function**, not a state, it's a **getter** function. `deepJS.__proto__` will use the deepJS as execution context and get the prototype of deepJS.

- **Infinite Recursion**
```javascript
function Workshop(teacher) {
  this.teacher = teacher;
}

Workshop.prototype.ask = function(question){
  console.log(this.teacher, question);
}

var deepJS = new Workshop("Kyle");
// 
deepJS.ask = function(question){
  // this refers to deepJS
  this.ask(question.toUpperCase());
}

deepJS.ask("Oops, is this infinite recursion?") // yes!
```
- **Fix using Dunder Proto**
```javascript
function Workshop(teacher) {
  this.teacher = teacher;
}

Workshop.prototype.ask = function(question){
  console.log(this.teacher, question);
}

var deepJS = new Workshop("Kyle");
deepJS.ask = function(question){
  this.__proto__.ask.call(this,question.toUpperCase());
}

deepJS.ask("Oops, is this infinite recursion?") // No!
```

#### Inheritance

- **Prototypal Inheritance**
> 原型链向上查找的过程并不会改变this的指向
```javascript
// constructor
function Workshop(teacher){
  this.teacher = teacher;
}
// prototype
Workshop.prototype.ask = function(question){
  console.log(this.teacher, question);
}

// link constructor: 仅仅改变指向
function AnotherWorkshop(teacher){
  Workshop.call(this, teacher);
}

// link prototype： 
AnotherWorkshop.prototype = Object.create(Workshop.prototype);

AnotherWorkshop.prototype.speakUp = function(msg){
  this.ask(msg.toUppderCase());
}
var JSRecentParts = new AnotherWorkshop('Kyle');
JSRecentParts.speakUp('Is this actually inheritance?');
```
<div style="text-align:center; margin:auto"><img src="https://geekeaskblogpics.s3-ap-southeast-2.amazonaws.com/posts/2019-11-24-14-50-18.png"></div>


- Class Inheritance
#### Class Inheritanace
- Class Inheritanace **copies** objects;
- Prototypal inhertiace **links** objects.
<div style="text-align:center; margin:auto"><img src="https://geekeaskblogpics.s3-ap-southeast-2.amazonaws.com/posts/2019-11-24-16-38-51.png"></div>



### Issues
#### Override Binding
- If you have already use `bind`,
- You can only use `new` to override the binding object;

#### `prototype` on Arrow Function
- Arrow Function doesn't have `this`.
- Arrow Function doesn't have any prototype.
- So you can not call `new` on an arrow function.

#### Shadow Prototypes
- **shadow** means **override**.
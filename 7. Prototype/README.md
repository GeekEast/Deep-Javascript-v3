<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Prototype](#prototype)
  - [Constructor Call](#constructor-call)
  - [Old School Prototyping](#old-school-prototyping)
  - [Prototype Chain](#prototype-chain)
  - [Override binding](#override-binding)
  - [`prototype` on Arrow Function](#prototype-on-arrow-function)
  - [`this` vs `super`](#this-vs-super)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Prototype
### Constructor Call
- Objects are created by 'constructor' call(`new` method);
- A 'Constructor call' make object onits own **prototype**
- A 'Constructor call' make a link to its prototype
 
### Old School Prototyping
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
// by default, if there is no property existing in current object, it will go up
deepJS.ask("Deep JS");
reactJS.ask("React JS"); 
```
### Prototype Chain
- `contructor` is only a name, it's not like the constructor in other programming language, like `java`
- **Contructor** function has only `one` instance, **prototype** only has `one` instance, but the objects, essentially the `execution context` has `many`.
- 对象创建的过程，其实是创建同一构造器，不同execution context的过程。
<div style="text-align:center; margin:auto"><img src="img/2019-11-24-01-39-47.png"></div> 
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

### Override binding
- If you have already use `bind`,
- You can only use `new` to override the binding object;

### `prototype` on Arrow Function
- Arrow Function doesn't have prototype.

### `this` vs `super`
- `super` is determined during complilation time


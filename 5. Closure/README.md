<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Closure](#closure)
  - [Examples](#examples)
  - [Close over What?](#close-over-what)
  - [Interview Questions](#interview-questions)
- [Module Pattern](#module-pattern)
  - [Factory Pattern](#factory-pattern)
  - [ES6 Module](#es6-module)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Closure
> Closure is when a function "remembers" its' **lexical scope** even when the function is executed **outside** the lexical scope.

#### Examples
- **Example 1**
```javascript
function ask(question){
  // waitASec close over the variable called question.
  setTimeout(function waitASec() {
    console.log(question);
  }, 100);
}

ask("What is closure?");
```
- **Example 2**
```javascript
function ask(question){
  // question is preserved with the function called holdYourQuestion()
  return function holdYourQuestion() {
    console.log(question);
  }
}
var myQuestion = ask("What is closure");
myQuestions();
```
<!-- more -->

#### Close over What?
> Close over variables rather than values

```javascript
var teacher = 'Kyle';
var myTeacher = function() {
  console.log(teacher);
};

teacher = "Suzy"
myTeacher(); // live link!
```
#### Interview Questions
- Output?
```javascript
for (var i = 1; i<=3; i++){
  setTimeout(function(){
    console.log(`i: ${i}`);
  }, i * 1000);
}
```
- Output?
```javascript
for (var i=1; i<=3;i++){
  let j = i;
  setTimeout(function() {
    console.log(`j: ${j}`)
  }, j * 1000);
}
```
- Output?
```javascript
for (let i=1; i<=3; i++){
  setTimeout(function() {
    console.log(`i: ${i}`)
  }, i * 1000);
}
```
- Why?
> - First one, **only** one variables and closed over the only value
> - Second one, **three** variables and closed over respectively.

### Module Pattern
> Similar to `encapsulation`
> - Make state as **Private**
> - Make function as **Public**
> - Prerequisite: **Closure**.
#### Namespace Pattern
> Problem: You can still access the teacher directly
```javascript
var workshop = {
  teacher: "Kyel",
  ask(question){
    // this means 
    console.log(this.teacher, question);
  },
};

workshop.ask("Is this a module?");
```

#### Revealing Pattern
> Module encapsulate `data` and `behavior` together. The state of a module is held by its methods via **closure**.
- use `IIFE` for **singleton**
```javascript
var workshop = (function Module(teacher){
  var publicAPI = { ask, };
  return publicAPI;

  // *****************
  function ask(question){
    console.log(teacher, question);
  }
})("Kyle");
workshop.ask("It's a module, right?");
```

#### Factory Pattern
```javascript
function WorkshopModule(teacher) {
  var publicAPI = {ask, };
  return publicAPI;

  function ask(question){
    console.log(teacher, question);
  }
};

var workshop = WorkshopModule("Kyle");
workshop.ask("It's a module, right?");
```

#### ES6 Module
- This is **singleton** export.
```javascript
var teacher = "Kyle"; // automatically private

export default function ask(question){ // as public with closure on private things.
  console.log(teacher, question); 
}
```
- Import
```javascript
import ask from 'workshop.js';
import * as ask from 'workshop.js';
```

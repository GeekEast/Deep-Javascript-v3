<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Closure](#closure)
  - [Close over variables rather than values](#close-over-variables-rather-than-values)
  - [Classical Interview Question](#classical-interview-question)
- [Module Pattern](#module-pattern)
  - [Namespace Pattern](#namespace-pattern)
  - [Revealing Pattern](#revealing-pattern)
  - [ES6 Module](#es6-module)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Closure
> Closure is when a function "remembers" its' **lexical scope** even when the function is executed **outside** the lexical scope.
### Example 1
```javascript
function ask(question){
  // waitASec close over the variable called question.
  setTimeout(function waitASec() {
    console.log(question);
  }, 100);
}

aks("What is closure?");
```
### Example 2
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
### Close over variables rather than values
```javascript
var teacher = 'Kyle';
var myTeacher = function() {
  console.log(teacher);
};

teacher = "Suzy"
myTeacher(); // live link!
```
### Classical Interview Question
```javascript
for (var i = 1; i<=3; i++){
  setTimeout(function(){
    console.log(`i: ${i}`);
  }, i * 1000);
}
```
- What's the difference and why?
```javascript
for (var i=1; i<=3;i++){
  let j = i;
  setTimeout(function() {
    console.log(`j: ${j}`)
  }, j * 1000);
}
```
- First one, **only** one variables and closed over the only value
- Second one, **three** variables and closed over respectively.
```javascript
for (let i=1; i<=3; i++){
  setTimeout(function() {
    console.log(`i: ${i}`)
  }, i * 1000);
}
```

## Module Pattern
- Make state as **Private**
- Make function as **Public**
- Implementation: **Closure**.
### Namespace Pattern
- Problem: You can still access the teacher directly
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
### Revealing Pattern
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
### Factory Pattern
```javascript
function WorkshopModule(teacher) {
  var public API = {ask, };
  return publicAPI;

  function ask(question){
    console.log(teacher, question);
  }
};

var workshop = WorkshopModule("Kyle");
workshop.ask("It's a module, right?");
```

### ES6 Module
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
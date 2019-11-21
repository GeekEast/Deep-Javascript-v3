<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Closure](#closure)
  - [Close over variables rather than values](#close-over-variables-rather-than-values)
  - [Classical Interview Question](#classical-interview-question)

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

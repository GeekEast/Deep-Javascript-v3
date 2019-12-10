<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Trap All in One](#trap-all-in-one)
- [Interview Questions](#interview-questions)
  - [Coercion](#coercion)
  - [Tricky one](#tricky-one)
  - [Why `Kyle` is not in the global object?](#why-kyle-is-not-in-the-global-object)
  - [How to identify Scope?](#how-to-identify-scope)
- [Commons:](#commons)
  - [Scope and Object](#scope-and-object)
  - [Terms](#terms)
  - [Lexical Scope](#lexical-scope)
  - [Dynamic scope](#dynamic-scope)
  - [Override Binding](#override-binding)
  - [`prototype` on Arrow Function](#prototype-on-arrow-function)
  - [Shadow Prototypes](#shadow-prototypes)
- [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Trap All in One
- What's the result?
- Explain what happend behind the scene?
<div style="text-align:center; margin:auto"><img src="img/2019-11-24-23-13-33.png"></div>

### Interview Questions
#### Coercion
```javascript
var x = "1"; 
var y = 1; 
a = x + y;
console.log(a);
console.log(x == y);
console.log(x === y);
```
#### Tricky one
```javascript
var j =0;
for(var i=0; i<10; i++){
  // console.log(i);
setTimeout(function(){
   j +=i;
},i*1000)
}
```

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

#### How to identify Scope?
- `this`'s scope will the be **global object** rather than **workshop** because `object is not a scope`
- global **scope** doesn't have `this`, so by default it is `{}`;
- `Only` **function scope** has `this`
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

### Commons:
- Don't use MDN, use [ecma-262](https://www.ecma-international.org/ecma-262/9.0/#sec-tostring)
- Polyfill Pattern
```javascript
if (!Object.is) {
  Object.is = function ObjectIs() {
    ...
  }
}
```
#### Scope and Object
- `teacher` trace `lexical scope`
- `this.teacher` trace **execution context** and then **prototype chain**

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

#### Override Binding
- If you have already use `bind`,
- You can only use `new` to override the binding object;

#### `prototype` on Arrow Function
- Arrow Function doesn't have `this`.
- Arrow Function doesn't have any prototype.
- So you can not call `new` on an arrow function.

#### Shadow Prototypes
- **shadow** means **override**.

### Reference
- [你不知道的JS](./Reference/)
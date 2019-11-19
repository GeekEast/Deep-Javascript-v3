<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Scope](#scope)
  - [Compiler vs Interpreter](#compiler-vs-interpreter)
  - [Units of Scope](#units-of-scope)
  - [Lexical Scope](#lexical-scope)

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
- In javascript,during the **compiling** stage, **scopes** will be identified (`bucket and marbles will be places correctly`)

### Units of Scope
- functions
- blocks

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
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Abstract Equality Comparison](#abstract-equality-comparison)
  - [`==` vs `===`](#-vs-)
    - [`==` allows for coercion](#-allows-for-coercion)
    - [`===` disallows for coercion](#-disallows-for-coercion)
  - [Summary](#summary)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Abstract Equality Comparison
### `==` vs `===`
- [SPEC](https://www.ecma-international.org/ecma-262/9.0/#sec-abstract-equality-comparison)
> Only use the `==` when you know the type especially when implicit coercion is very helpful.
#### `==` allows for coercion
- `null` equal to `undefined`.
```javascript
const ws1 = {topic: null};
const ws2 = {};
if (ws1.topic === null || ws1.topic === undefined)
if (ws1.topic == null);
// better and simple!
if (ws2.topic === null || ws2.topic === undefined)
if (ws2.topic == null);
```
- any is number, compare number
```javascript
const ele1 = 1；
const ele2 = ele.value; // I don't know the type!

// if you want to do the comparison between numebrs
if (Number(ele1) === Number(ele2))

// why not use
if (ele1 == ele2)
```
####  `===` disallows for coercion
- use `===` is safe because it's for the case that **you don't know the types**.
> But `implicit coercion` is fastet than you do that.

### Summary
- If you know the types, `==` is better.
- Otherwise you clould use `===` for safety.
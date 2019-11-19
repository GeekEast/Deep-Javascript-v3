<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Wrangling Equality](#wrangling-equality)
  - [Instructions](#instructions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Wrangling Equality

In this exercise, you will define a `findAll(..)` function that searches an array and returns an array with all coercive matches.

## Instructions

1. The `findAll(..)` function takes a value and an array. It returns an array.

2. The coercive matching that is allowed:

	- exact matches (`Object.is(..)`)
	- strings (except "" or whitespace-only) can match numbers
	- numbers (except `NaN` and `+/- Infinity`) can match strings (hint: watch out for `-0`!)
	- `null` can match `undefined`, and vice versa
	- booleans can only match booleans
	- objects only match the exact same object

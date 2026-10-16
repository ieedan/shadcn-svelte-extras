# filters

```txt

```

## Filter types

- number
- boolean
- string
- date

## What kind of things are we filtering?

- Filtering by a joined item by ID - Item might have a name and description but the value we want in the end is the ID, operator could be is or is not
- Filtering by a value field like a number - So we want a number out of it along with an operator
- Filtering by a date or time range or relative timestamp - operators include `between` `equal` `before` `after`
- Filtering by a string value on a field - So like filtering on title or description `starts with` `does not start with` `ends with` `does not end with` `contains` `does not contain` `is` `is not`
- Filtering by a boolean - Filtering something like "Is Completed" `!=` `=` it's often useful to be able to change the wording here as well like `Is not complete` or `Has not completed` etc.

^^^^^^

This is the lowest level of it.

## What we need

1. A way of serializing and deserializing filters - JSON is just fine
2. 

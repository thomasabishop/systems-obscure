---
title: "The varieties of Bash variable syntax"
slug: /varieties-bash-variable-syntax/
date: 2023-05-19
---

For me, one of the trickiest and most frustrating aspects in writing Bash scripts is using the right syntax when working with variables.

The majority of errors that I encounter in development relate to the handling of variables. Typically I will have forgotten to use quotes, or used the wrong type of quotes, or neglected to add the curly braces or used the curly braces but not the dollar sign, etc.

I have been meaning to address this head-on and get clear on the differences once and for all but kept putting it off. I have written this post to rectify things.

## The difference between `$var`, `${var}`, and `"${var}"`

Let's start with the following variable:

```sh
var="hello"
```

If we simply want to output the raw value that the `var` variable points to we use the dollar:

```sh
echo $var
# hello
```

If we wish to **interpolate** the value by combining it with additional or wrapping content, we use `${var}`:

```sh
echo ${var}world
# helloworld
```

Without the curly braces Bash will not know that we are trying to interpolate and will look for a variable named `$varnow` and fail to find it, returning an error.

```sh
echo $varworld

```

This leaves `"${var}"`. Let's update the value of `var`:

```sh
var="the time is now"
```

Now, the value designated by `var` contains whitespace. In Bash, whitespace is more than another character, it is also implicitly declares an array. So as well as a single string, `var` can be interpreted as a variable that holds multiple values:

```
[0] the
[1] time
[2] is
[3] now
```

Critically, both `$var` and `${var}` will interpret the whitespace as designating an array but `"${var}"` will not. Thus if we looped through `$var` and `${var}`:

```sh
for ele in $var; do echo $ele; done
for ele in ${var}; do echo $ele; done
```

Both lines would output:

```
the
time
is
now
```

But `"${var}"` would preserve the original raw value of the whitespace, outputting:

```
the time is
```

Therefore, we should not use `"${var}"` if we want to iterate through each space-demarcated value in a string. We should only use it when we want to preserve the exact value of the variable.

## Parameter expansion with `${var}`

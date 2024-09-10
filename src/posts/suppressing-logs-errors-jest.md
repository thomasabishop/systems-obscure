---
title: "Suppressing logs and  errors in Jest"
slug: /suppressing-logs-errors-jest/
date: 2024-09-10
tags: ["javascript", "unit-testing"]
---

It annoys me when I am working on a project and a previous developer has left
logs and/or thrown errors in their unit tests. To be clear: I mean when the
developer is testing that an error is thrown in the right circumstances, not a
test failure arising from regression. The former makes the latter harder to
detect by polluting the output.

This can be so easily prevented.

Take the following function:

```js
function sillyFunction(int) {
  console.info(`Now handling ${int}`)
  if (int > 2) throw new Error(`Error: int ${int} is greater than two`)
  else return
}
```

To avoid pointlessly logging to the console and to confirm the error without
actually throwing it:

```js
import { jest } from "@jest/globals"

describe("sillyFunction", () => {
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {})
  })

  afterEach(() => {
    console.info.mockRestore()
  })

  it("throws error if `int` is less than 2", () => {
    expect(() => {
      sillyFunction(3)
    }).toThrow("Error: int 3 is greater than two")
  })
})
```

The `spyOn` method silences the output of `console.error` by returning nothing.
If we wish, we can still confirm that the log is acting as expected during the
runtime of the test by again using a spy:

```js
const consoleInfoSpy = jest.spyOn(console, "info")
expect(consoleInfoSpy).toHaveBeenCalledWith("Now handling x")
```

The `toThrow` method catches the error before it hits the console and allows us
to interrogate it. If it was an asynchronous function under test, we would need
to use the matcher `rejects.toThrow`. This waits for the promise to resolve
before checking if it has been rejected.

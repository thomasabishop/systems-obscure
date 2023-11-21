---
title: "Jest parameterization"
slug: /jest-parameterization/
date: 2023-11-20
---

At work I am in the process of upgrading our AWS Lambdas to use the v.18 Node runtime (most of them are still using v.14). It has been a good opportunity to carry out refactoring and address technical debt.

Many of the lambdas lack unit tests whilst others have tests that haven't been maintained. Thus I've been spending time adding and optimising tests in Jest.

I've been harnessing parameterization when improving unit test coverage. The lambdas I'm currently working on are subroutines within a broader [AWS Step Function](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html) that constitutes the backend of one of our internal content management systems. Much of the functionality consists in generating and parsing properties from XML and JSON. As I am testing the same code under different conditions, the tests are highly repetitive and can be readily parameterized.

Here's one example:

```js
describe("handler", () => {
  let mockApiGatewayEvent = {
    propertyId: "1234",
    isCrossPublished: false,
  }
  describe("exit conditions", () => {
    it("should throw an error if a user attempts to unpublish an alpha file", async () => {
      event = {
        ...event,
        fileId: "alpha:1234",
      }
      await expect(handler(event)).rejects.toThrow("Not allowed to unpublish file alpha:1234")
    })
    it("should throw an error if user attempts to unpublish a beta file", async () => {
      event = {
        ...event,
        fileId: "beta:1234",
      }
      await expect(handler(event)).rejects.toThrow("Not allowed to unpublish file beta:1234")
    })
    // and so on...
  })
})
```

I've anonymised the specifics of the data but the process is straightforward: I'm asserting that the correct error text is returned if a user attempts to delete a certain filetype. I reduced the verbiage of countless `it` blocks by utilising parameterization:

```js
describe("exit conditions", () => {
  let mockApiGatewayEvent = {
    projectId: "1234",
    preview: false,
  }

  it.each([["alpha:1234"], ["beta:1234"]])(
    "should throw an error if user attempts to unpublish %s file",
    async (fileId) => {
      mockApiGatewayEvent = {
        ...mockApiGatewayEvent,
        fileId,
      }
      await expect(handler(mockApiGatewayEvent)).rejects.toThrow(
        `Not allowed to unpublish file ${fileId}`
      )
    }
  )
})
```

Instead of multiple `it` clauses, there is a single `each` expression that loops through each file variant, executing the same test each time, changing only the file name that is output.

The `%s` symbol is a placeholder for string substitution. This lets me include the name of each variant in the test description. This is important because there is a risk of obscuring the specifics of each test iteration when using parameterization. It's essential to be able to trace a failure to the specific iteration.

In the example below, the process is functionally the same but there are more parameters in the mix:

```js
describe("deletePageFromS3()", () => {
  beforeEach(() => {
    process.env.AWS_ENV = "live"
    s3ClientMock.reset()
  })

  const parameters = [
    { previouslyPublished: false, isDraft: false, bucket: "bucket:alpha", key: "key:alpha" },
    {
      previouslyPublished: true,
      isDraft: false,
      bucket: "bucket:beta",
      key: "key:beta",
    },
    { previouslyPublished: false, isDraft: true, bucket: "bucket:gamma", key: "key:gamma" },
    {
      previouslyPublished: true,
      isDraft: true,
      bucket: "bucket:delta",
      key: "key:delta",
    },
  ]

  it.each(parameters)(
    "should return page for deletion, given: previouslyPublished is %s, isDraft is %s",
    async ({ previouslyPublished, isDraft, bucket, key }) => {
      await deleteFileFromS3("url", previouslyPublished, isDraft)
      const deleteObjectCommand = s3ClientMock.calls()[0].args[0]
      expect(deleteObjectCommand.input).toEqual({
        Bucket: bucket,
        Key: key,
      })
    }
  )
})
```

The process under test is a function that uses the AWS SDK to delete objects from an S3 bucket. I am checking that the (mocked) S3 client is called with the correct parameters.

This time I am passing in an array of objects to the `each` function rather than a multi-dimensional array. This makes it easier to destructure the specific properties in the individual test cases. Again I use `%s` to interpolate a subset of the parameters into each test description. `%s` applies to the each value in the `each` array sequentially so just repeat it as required.

This has been a brief sketch of some applied examples of parameterization. For a more detailed and admirably clear account, see [Parameterized tests in JavaScript with Jest](https://blog.codeleak.pl/2021/12/parameterized-tests-with-jest.html) by Rafał Borowiec.

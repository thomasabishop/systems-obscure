---
title: Some nice TypeScript
slug: /some-nice-typescript/
date: 2023-09-26
tags: ["log", "typescript"]
---

I wanted to share a snippet of a TypeScript function I wrote recently. Although
it's not a particularly interesting scenario, I like it because it is simple and
elegant, if I say so myself.

At the moment I am working on an AWS Lambda that queries the API of the Toggl
time-tracking service to retrieve a list of time entries for a given date range.
The API returns an array of time entries with the following structure:

```json
{
  "id": 3136598124,
  "workspace_id": 2360906,
  "project_id": 193325937,
  "task_id": null,
  "billable": false,
  "start": "2023-09-21T20:10:02+00:00",
  "stop": "2023-09-21T20:39:54Z",
  "duration": 1792,
  "description": "pytest blog post",
  "tags": [],
  "tag_ids": [],
  "duronly": true,
  "at": "2023-09-21T20:39:54+00:00",
  "server_deleted_at": null,
  "user_id": 3700888,
  "uid": 3700888,
  "wid": 2360906,
  "pid": 193325937
}
```

Notice that the `project_id` is a number rather than the human-readable string
that appears in the Toggl UI. When I return the data to the frontend I want to
have the name of the project rather than this number. So I wrote the following
transformer:

```ts
interface IProject {
  id: number
  name: string
  [key: string]: unknown
}

type TProjectMap = Record<IProject["id"], IProject["name"]>

const getProjects = async (): Promise<TProjectMap> => {
  const workspace = process.env.TOGGL_WORKSPACE_ID
  const togglClient = new TogglClient()
  const projects: IProject[] = await togglClient.get(
    `workspaces/${workspace}/projects`
  )
  return parseProjects(projects)
}

const parseProjects = (projects: IProject[]): TProjectMap => {
  return projects.reduce((projectMap: TProjectMap, project: IProject) => {
    projectMap[project.id] = project.name
    return projectMap
  }, {})
}
```

`getProjects` obviously calls the Toggl API to retrieve the list of projects for
the workspace. The `parseProjects` function takes the array of projects and
returns an object with the project IDs as keys and the project names as values.
In my main controller function, I will then be able to transform the project IDs
like so:

```ts
const projects = await getProjects()
const projectName = projects[193325937]
console.log(projectName)
// "Practical study"
```

What I like:

- The time-entry returns several properties that I am not interested in - I only
  want `id` and `name`. I could manually type the other properties to ensure
  full type-safety but life is short and I can't be bothered. One get-out would
  be to use `any` for the other properties but this is obviously self-defeating
  in TS. Instead I use `unknown` and then type-assert the return value of
  `parseProjects` to `TProjectMap` which is a record of `number` keys and
  `string` values. This means that if I try to access a property of the
  `projectMap` object that is not a number, I will get a type error with the
  added benefit that I make it transparent to the reader that I am solely
  interested in the `id` and `name` keys.

- Rather than using a `forEach` loop or a `map` function combined with a
  `filter`, I make good use of `reduce`, _reduce_ being a very semantic account
  of what I am seeking to do.

More generally, I feel like I have purposefully harnessed the explanatory value
of the type system to make the code more readable and self-documenting. This is
a good example of where TypeScript can reduce the need for boilerplate and
comments, in addition to the obvious benefits of type-safety.

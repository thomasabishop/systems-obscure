---
title: "AWS Lambda: save articles"
slug: /save-articles-lambda
date: 2023-09-07
---

I have just set up a [new AWS Lambda](https://github.com/thomasabishop/lambdas/tree/main/save-articles) called _save-articles_ written in Python. It retrieves entries from my saved articles in Pocket, parses the key metadata and saves it to a Google Sheet.

I've created this because I find the Pocket iPhone and web app to be practically unusable. They distinguish "Saved" articles from "Archived" articles without making the distinction clear and constantly switch the status of articles between these two states. This makes retrieval and ordering really difficult. On mobile it constantly updates and reorders the article list _as you are viewing it_ which makes using the app really disorientating. However I've used Pocket for a long time and the alternatives are worse or have bad APIs.

Now I am able to keep my interactions with Pocket minimal: I use the Pocket browser extension to save and tag articles and that's it. My pre-existing _pocket-api_ lambda is able to retrieve my articles by tag. The _save-articles_ lambda calls this endpoint to get the articles and then uses my _gsheets-utils_ lambda to save them to a Google Sheet.

By saving the articles to a Google Sheet I can access them from anywhere without using a database. Each tag has it's own corresponding sheet that lists the articles in reverse chronological order. It executes on a cron timer once a day.

Here are my saved technical articles, for example:

![](./img/saved_tech_articles.png)

I have additional sheets/tags for archived articles, general topics and articles I wish to share with my girlfriend (I simply give her read access to a worksheet.)

The architecture is summarised below:

![](./img/save-articles-architecture.png)

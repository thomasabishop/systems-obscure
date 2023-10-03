---
title: "Two strategies for handling exceptions in Python"
slug: /two-strategies-for-handling-exceptions-in-python/
date: 2023-10-03
---

The following function evinces two strategies for handling exceptions in Python:

```py
def parse_articles(articles: Dict[str, Any]) -> List[List]:

    if not articles:
        raise ValueError("No articles to parse")

    articles_list = []

    for article in articles.values():
        try:
            time_added, given_title, resolved_url = (
                article["time_added"],
                article["given_title"],
                article["resolved_url"],
            )
        except KeyError as e:
            logging.warning(
                f"Article missing {e} property. Skipping article: {given_title}."
            )
            continue

        articles_list.append([time_added, given_title, resolved_url])

    return articles_list
```

The function is a basic transformer: it receives a dictionary and loops through a subset of its properties which are also dictionaries, returning selected keys from each as a multidimensional array.

The first exception handler checks whether the `articles` dictionary is populated or `None`. If either are the case, the function exits and returns a `ValueError`. This approach _propagates_ the error and is deliberately and transparently obstructive: the function exits before it can execute the main code. If this exception is not adequately handled by the caller, it will cause a runtime error.

The second instance of exception handling occurs in the loop. If any of the three specified properties (`time_added`, `given_title`, `resolved_url`) are absent from the `articles` dictionary, a `KeyError` exception will be thrown. The outcome is quite different from the first exception however. The function will not exit immediately, it simply won't append this set of properties to the list, and will move on to the next iteration of the loop.

This behaviour, known as _graceful degradation_ is afforded by the _try, except_ scaffolding. It literally allows us to `try` an execution before an exception can be raised. And if an exception is raised, we can augment the code with a `finally` block to return something regardless of the exception, such as an empty list.

In the scenario above, `finally` isn't used since the `continue` ensures that the execution proceeds to the next iteration of the loop. In addition, even if none of the `articles` contain the requisite keys, an empty list will be still be returned.

Both strategies, propagation and graceful degradation, have their merits.

Propagation is useful because it identifies the error immediately and blocks the code execution, meaning that failures do not occur silently or go unchecked, forcing the caller to implement a handling routine. This is particulaly useful for genuine exceptions - cases that _should not_ occur in regular execution. If they occur, they are so severe that they should be addressed immediately, not deferred. One such scenario might be a memory-intensive script or lambda running in a severless cloud provider: you would not want it to waste compute time on a process that is not going to return the expected value.

The obvious benefit of graceful degradation is that it doesn't halt the program straight away. This is most suitable for cases where the exception in question is fairly common. In the context of the code example this would be not returning articles that lack the requisite keys. Providing most of the articles are parsable, the fact that some are skipped is unlikely to be a terminal fault in the application.

Finally, the two methods differ in the amount of work required of the developer. Propagation requires explicit error handling from the function or method that receives the error. In contrast, graceful degradation allows for silent failure - the error is not immediately apparent and may only be detected in logs at a later stage.

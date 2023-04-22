---
title: "Bash script: random revision topic"
slug: /revision-bash-script
date: 2022-12-28
---

I keep all my study notes in Markdown format in a [single repository]('https://github.com/thomasabishop/computer_science'). Because I study a lot of varied topics it can sometimes seem that I am just writing notes and forgetting about them. This is particularly true of topics that I don't draw on in my everyday work.

As a corrective I have written a script at the root of my notes repository that selects a random revision topic from the categories I specify. When I start studying each morning (I study from 6am-8am before work) I run the script and spend ten minutes consolidating the topic it selects. Sometimes this will just mean re-reading the notes but often I will rewrite or add ideas that I have gleaned in the period since I originally studied the topic, extending my understanding of the subject matter.

```bash
#!/bin/bash

# Choose source directories...
DIRS_TO_PARSE="../Computer_Architecture ../Electronics_and_Hardware ../Operating_Systems ../Programming_Languages/Shell ../Logic"

# Return array of all files belonging to source dirs...
for ele in $DIRS_TO_PARSE; do
FILE_MATCHES+=( $(find $ele -name "\*.md" -type f) )
done

# Generate a random integer between 0 and the match array length...
RANDOM_FILE_INDEX=$(( $RANDOM % ${#FILE_MATCHES[@]} + 0 ))

# Return file matching that index...
echo "Revise this topic: ${FILE_MATCHES[$RANDOM_FILE_INDEX]}"
```

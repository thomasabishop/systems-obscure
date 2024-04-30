---
title: "Bash script: delete unused images"
slug: /image-deletion-bash-script/
date: 2023-04-16
---

When I'm working on my technical notes I often insert images, diagrams,
screenshots etc. Often, I end up creating multiple images that I end up not
using. I don't like commiting dead bytes to the repo so I wrote a short script
that reads each file in the image directory and looks to see if it is referenced
in any Markdown files. If it isn't, the image is deleted.

```bash
#!/bin/bash

find /home/thomas/repos/eolas/_img -type f | while read filename; do
    rg "${filename##*/}" ../ --type markdown >/dev/null 2>&1
    if [ "$?" -eq 1 ]; then
        echo "Deleted unused image: ${filename##*/}"
        rm $filename
    fi
done
```

Example:

```sh
./clean_image_directory.sh
Deleted unused image: multiplication_03.gif
Deleted unused image: Pasted_image_20220319174839.png
Deleted unused image: multiplication_04.gif
Deleted unused image: multiplication_02.gif
```

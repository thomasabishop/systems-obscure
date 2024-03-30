#!/bin/bash

terminator -e "bash -c 'source ~/.zshrc; cd ${HOME}/repos/lambdas/node-js/code-stats; make start; exec bash'" &
terminator -e "bash -c 'source ~/.zshrc; cd ${HOME}/repos/lambdas/node-js/code-durations; make start; exec bash'" &

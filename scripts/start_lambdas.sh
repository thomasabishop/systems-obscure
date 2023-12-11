#!/bin/bash

terminator -e "bash -c 'source ~/.zshrc; cd ${HOME}/repos/lambdas/node-js/pocket-articles; make start; exec bash'" &
terminator -e "bash -c 'source ~/.zshrc; cd ${HOME}/repos/lambdas/node-js/code-metrics; make start; exec bash'" &
terminator -e "bash -c 'source ~/.zshrc; cd ${HOME}/repos/lambdas/node-js/activities; make start; exec bash'" &

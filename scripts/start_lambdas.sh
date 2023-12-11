#!/bin/bash

terminator -e "bash -c 'source ~/.zshrc; cd ${HOME}/repos/lambdas/pocket-api; make start; exec bash'" &
terminator -e "bash -c 'source ~/.zshrc; cd ${HOME}/repos/lambdas/functions/code-metrics; make start; exec bash'" &
terminator -e "bash -c 'source ~/.zshrc; cd ${HOME}/repos/lambdas/functions/activities; make start; exec bash'" &

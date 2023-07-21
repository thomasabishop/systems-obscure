#!/bin/bash

terminator -e "bash -c 'source ~/.zshrc; cd ${HOME}/repos/lambdas/pocket-api-lambda; make start; exec bash'" &
terminator -e "bash -c 'source ~/.zshrc; cd ${HOME}/repos/lambdas/code-metrics-lambda; make start; exec bash'" &

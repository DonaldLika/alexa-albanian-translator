#!/bin/bash

echo 'Initialising Ask CLI'

ask init

echo 'Installing node dependencies'

cd lambda
npm install
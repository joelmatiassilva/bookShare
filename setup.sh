#!/bin/bash
apt-get update
echo 'setup.hs: Finished updating apt-get'
sudo apt-get install mysql-server
echo 'setup.hs: Finished installing mysql'
npm install
echo 'setup.hs: Finished npm install'
bower install
echo 'setup.hs: Finished bower install'

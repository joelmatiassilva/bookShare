#!/bin/bash
echo 'Please type your Google Books API Key'
read googleKey
apt-get update
echo 'setup.hs: Finished updating apt-get'
sudo apt-get install mysql-server
echo 'setup.hs: Finished installing mysql'
npm install -g nodemon
npm install -g grunt-cli
npm install
echo 'setup.hs: Finished npm install'
bower install --allow-root
echo 'setup.hs: Finished bower install'
cd client
rm keys.example.js
echo "export default {GOOGLE_BOOKS_KEY: '$googleKey'};" >> keys.js
cd ..
echo 'setup.hs: Finished setting up google books API key'
grunt build
echo 'setup.hs: Finishing building with grunt'
echo 'setup.hs: Starting to run server'
PORT=80 nodemon server/server.js
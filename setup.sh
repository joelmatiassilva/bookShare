#!/bin/bash
echo 'Please type your Google Books API Key'
read googleKey
apt-get update
echo 'setup.hs: Finished updating apt-get'
sudo apt-get install mysql-server
echo 'setup.hs: Finished installing mysql'
npm install
echo 'setup.hs: Finished npm install'
bower install --allow-root
echo 'setup.hs: Finished bower install'
cd client
rm -f keys.example.js
echo "export default {GOOGLE_BOOKS_KEY: '$googleKey'};" >> keys.js
cd ..

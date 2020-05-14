#!/bin/bash

cd client
npm run build
cd ..

rm -rf tmp
mkdir tmp
mkdir tmp/client
mkdir tmp/server

mv client/build tmp/client/build

cp server/server.js tmp/server
cp server/package.json tmp/server

cd tmp
zip ../prod.zip -r ./
cd ..

rm -rf tmp
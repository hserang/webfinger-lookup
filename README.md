# This repo is not maintained and exists for historical purposes!
There are security issues with one or more dependencies. Use at own risk!

Webfinger Lookup
================
(deployed url)

## Usage

1. Enter domain where target account lies (example: staging.latambridgepay.com)
2. Enter account to Webfinger (example: acct:conner@staging.latambridgepay.com)
3. Click submit button
4. Toggle raw JSON data on and off by clicking "raw JSON"

## Example data
**Domain**
staging.latambridgepay.com

**Account**
acct:conner@staging.latambridgepay.com

![Interface](http://imgur.com/Nnd7B4Y.png)

![Interface JSON](http://imgur.com/23pBTy5.png)

## Development
https://github.com/hserang/webfinger-lookup

#### Install
```
git clone git@github.com:hserang/webfinger-lookup.git
cd webfinger-lookup
```

#### NPM/Bower/Gulp
```
npm install
bower install
ulimit -u 1000
ulimit -n 1000
npm run dev
```
*ulimit commands are only necessary if "npm run dev" produces EMFILE error*

#### Test
```
npm test
```

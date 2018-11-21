[![Build Status](https://travis-ci.org/telemark/papetrail-reports.svg?branch=master)](https://travis-ci.org/telemark/papetrail-reports)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# papetrail-reports

Collection of utilities to generate reports from Papertrail

# Setup
Clone or download this repo.

```sh
$ git clone git@github.com:telemark/papetrail-reports.git
```

cd into directory and install dependencies

```sh
$ npm install
```

Create a `.env` file with your API token for papertrail

```sh
API_TOKEN=your-api-token
```

# Usage

Run different npm scripts

## Unique users

Show number of unique users from the latest 2500 events

```sh
$ npm run unique-users-live
```

## Unique companies

Show number of unique companies and their names from the latest 2500 events

```sh
$ npm run unique-companies-live
```

## Extract archive files

Gunzips all .gz files in the archive directory and deletes zipped files after extraction.
You can download archived log files from Papertrail 

```sh
$ npm run extract-archive
```

## License

[MIT](LICENSE)

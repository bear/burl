[![Build Status](https://travis-ci.org/bear/burl.svg?branch=master)](https://travis-ci.org/bear/burl)

## Getting started

* git clone
* npm install

## Running

`npm start`

## Database

```
psql -d postgres -c "CREATE ROLE burl WITH PASSWORD 'password' NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT LOGIN"
createdb -O burl burl
psql -d burl -U burl -c "create table if not exists shorts ( short char(10) primary key, url varchar(300), created date not null default CURRENT_DATE )"
```

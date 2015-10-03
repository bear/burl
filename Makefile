CURRENT_DIR := $(shell pwd)

test:
	npm run test

test-cov:
	npm run test-cov

build: test docs
	npm run build

start:
	npm run start

.PHONY: test test-cov test-cov-html

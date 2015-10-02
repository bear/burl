CURRENT_DIR := $(shell pwd)

test:
	@NODE_ENV=test npm run test
test-cov:
	@NODE_ENV=test npm run test-cov
test-cov-html:
	@NODE_ENV=test npm run test-cov-html

build: test docs
	npm run build

start:
	npm run start

.PHONY: test test-cov test-cov-html

# Makefile for Maktabati documentation site

install:
	npm ci

dev:
	npm run docs:dev

build:
	npm run docs:build

preview:
	npm run docs:preview

clean:
	rm -rf node_modules docs/.vitepress/dist

.PHONY: install dev build preview clean

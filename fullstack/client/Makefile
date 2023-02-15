build:
	npx spago bundle-app
	rm -f dist/*.js dist/.*map
	# exec npx --node-arg=--max-old-space-size=4096 parcel build index.html
	NODE_OPTIONS='--max-old-space-size=4096' exec npx parcel build index.html

.PHONY: build

# Tutorial

This is from: https://blog.suborbital.dev/foundations-wasm-in-golang-is-fantastic

Notes:

1. The first part worked perfectly.
2. I did have to use `npm i` to install the server component; but once I did then the
the command `node index.js` started the server and `localhost:8080` rendered the page.

Steps from tutorial:
- created this folder
- added main.go and index.html (provided)
- added `.gitignore` to avoid saving wasm files and the node_modules folder
- npm i
- go mod init hello-world
- cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
- GOOS=js GOARCH=wasm go build -o main.wasm
- node index.js
- then point browser to localhost:8080



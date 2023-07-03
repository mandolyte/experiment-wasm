# Tutorial

This is from: https://blog.suborbital.dev/foundations-wasm-in-golang-is-fantastic

Notes:

This example shows how to access the dom.

Steps from tutorial:
- created this folder from the first-function example
- updated the main.go and go.mod files
- GOOS=js GOARCH=wasm go build -o main.wasm
- node index.js
- then point browser to localhost:8080



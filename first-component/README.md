# Attempting to make a WASM component and publish to NPM

- created this folder 
- copied from second-function folder main.go and go.mod
- updated the main.go and go.mod files

    Note: here I simply have a function in go defined. With no "main".

- GOOS=js GOARCH=wasm go build -o main.wasm


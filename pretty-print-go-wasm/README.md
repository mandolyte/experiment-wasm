# Attempting to make a WASM component and publish to NPM

- created this folder: `mkdir pretty-print-go-wasm`

- created go.mod:

```sh
$ cd pretty-print-go-wasm
$ go mod init github.com/mandolyte/pretty-print-go-wasm
go: creating new go.mod: module github.com/mandolyte/pretty-print-go-wasm
$ cat go.mod
module github.com/mandolyte/pretty-print-go-wasm

go 1.20
$
```

- created main.go (just copied from the webassembly-part-1 folder)

- compiled to wasm:
```sh
$ GOOS=js GOARCH=wasm go build -o main.wasm
```

- copied over the go `wasm-exec.js` file (comes with go install; see tutorial)

- created the "wrapper" Javascript code in index.js


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

- created main.go in `src` folder(just copied from the webassembly-part-1 folder)

- compiled to wasm:
```sh
$ GOOS=js GOARCH=wasm go build -o main.wasm
```

- copied the go `wasm-exec.js` file in `src` (comes with go install; see tutorial)

- created the "wrapper" Javascript code in `src/index.js`

- created package.json with what I think will be needed

- run "npm install"; had some warnings, but seemed to work.

- run "npm publish":

```sh
$ npm publish

> pretty-print-json-go-wasm@0.1.0 prepublishOnly
> rm -fr ./dist & babel ./src --out-dir ./dist -s inline

Successfully compiled 2 files with Babel (193ms).
npm notice 
npm notice 📦  pretty-print-json-go-wasm@0.1.0
npm notice === Tarball Contents === 
npm notice 762B README.md   
npm notice 634B package.json
npm notice === Tarball Details === 
npm notice name:          pretty-print-json-go-wasm               
npm notice version:       0.1.0                                   
npm notice filename:      pretty-print-json-go-wasm-0.1.0.tgz     
npm notice package size:  794 B                                   
npm notice unpacked size: 1.4 kB                                  
npm notice shasum:        020dd10fa465358de6957de021f5f4e1c37bc055
npm notice integrity:     sha512-asCbTFB4vTluK[...]XpqqOtZrjONrw==
npm notice total files:   2                                       
npm notice 
npm notice Publishing to https://registry.npmjs.org/
+ pretty-print-json-go-wasm@0.1.0
$ 
```

- Link: https://www.npmjs.com/package/pretty-print-json-go-wasm


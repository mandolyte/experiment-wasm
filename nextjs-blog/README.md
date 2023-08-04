# Using WASM from Go in Next.js

This README describes the steps taken to use
Go WASM in a Next.js application.

## 1. Create the Next.Js Starter App

I used this command to create the starter template:

```
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```

This command may be found at:
https://nextjs.org/learn/basics/create-nextjs-app/setup

Follow the directions there to finish set up and test it.

## 2. Write the Go code

Note:

1. I used Tinygo, which generates much smaller WASM files than
the out-of-the-box offering.
2. Tinygo also has a much simpler way to indicate the functions
to be exported. The OOTB offering is way complicated at this time.

For simplicity, I place the Go code, named `main.go` in the `public` folder.
Here is the entire file:

```go
package main

// This calls a JS function from Go.
func main() { }

// This function is exported to JavaScript, so can be called using
// exports.multiply() in JavaScript.
//export multiply
func multiply(x, y int) int {
    return x * y;
}
```

Observations:

1. It is a "main" package
2. The main function is present, but empty
3. The line above the multiply function is critical. It tells the
Tinygo compiler to export the function `multiply`

## 3. Generate the WASM

The command to compile to WASM is:

```sh
tinygo build -o main.wasm -target wasm ./main.go
```

Note that no `go.mod` or `go.sum` files are needed.

## 4. Interface to Javascript

Since Javascript is not currently able to import WASM and use directly,
each language supporting WASM has its own way of providing that 
interface to Javascript.

For Tinygo, this is a file from the installation folder. On my setup, 
that file is located here: `/usr/local/lib/tinygo/targets` and is
named `wasm_exec.js`.

This file must be imported into the Next.js application. So in this
example, I have copied it to `/pages/wasm_exec.js`.

That same folder contains `index.js` and I added this import to the 
end of the imports at the top of the file:

```js
import './wasm_exec.js';
```

As-is, the `wasm_exec.js` will not compile. Around line 30, comment
out these lines and all will be well.

```js
	// if (!global.fs && global.require) {
	// 	global.fs = require("fs");
	// }	
```

## 5. Using the WASM function in the app

Since this is Next.js we need to ensure that the WASM code is loaed
on the client. So I have placed instantiating code in a hook.

All the code I added to the `index.js` file is at the beginning of the `Home()` function.

### State variables

First, I added these two lines to capture some state:

```js
  const [wasm, setWasm] = useState(null)
  const [multiplyAnswer, setMultiplyAnswer] = useState(null)
```

The first captures the WASM code and the second makes the 
answer to the mulitplication function in the WASM code 
visible and useable to the app. Both have initial values of `null`
which is used to detect whether the states have been set
or not.

### Load and Instantiate via `useEffect` Hook

Second, I have the `useEffect` hook to load and instantiate the WASM
code. For convenience:

```js
  useEffect(() => {
    const WASM_URL = 'main.wasm';
    async function getWasm() {
      // console.log("type of Go is:",typeof Go)
      const go = new window.Go(); // Defined in wasm_exec.js
      // console.log("go is:", go)

      // console.log("fetching and setting up the WASM code at:",WASM_URL)
      WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
        let _wasm = obj.instance;
        go.run(_wasm);
        setWasm(_wasm.exports);
      })
    
    }

    if ( !wasm ) {
      getWasm()
    }
  }, []);
  ```

  Technically, I used the set state function `setWasm` to save the exported functions, not
  the entire WASM object.

### Run the Go `multiply` function

Lastly, I used another hook to run the Go function. Since the function
can't be called until the WASM is loaded and instantiated, the hook
watches for the WASM code to be available then run it. After getting the
answer, it sets another state variable which is used by the rendered 
page and which will update when the answer becomes available.

Here is the hook:

```js
  useEffect( () => {
    if ( wasm ) {
      console.log("wasm:", wasm)
      console.log("using the Go multiply function:")
      const _answer = wasm.multiply(2,3)
      setMultiplyAnswer(_answer)
      console.log(wasm.multiply(2,2))
    }
  }, [wasm])
```

Then in the rended pages, I have this:

```html
        <p>Using Go to multiply two numbers together:</p>
        <pre>{multiplyAnswer === null ? 'waiting...' : multiplyAnswer}</pre>
```

If the state for the answer is still null, it will show "waiting..." on the page.
When the hook sets the answer, the page will update showing the answer.
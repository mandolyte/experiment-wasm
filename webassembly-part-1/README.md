# Notes

This example based tutorial found at:
https://golangbot.com/webassembly-using-go/

In this example the Go code is located in `cmd/wasm/main.go`.
It appears that all Go WASM code will be located in a "main" package.

The main function looks like this:

```go
func main() {
	fmt.Println("Go Web Assembly")
	js.Global().Set("formatJSON", jsonWrapper())
	<-make(chan bool)
}
```

- The first line will output on the browser console.
- The second line will add to the Javascript environment
a globally accessible function named "formatJSON".
    - The first argument is the name of function as it will be know
    to Javascript in the browser.
    - The second argument is a function with a particular signature.

In this example, there is a function that actually sets up this
function and returns it. The signature of the returned function is:

```go
func(this js.Value, args []js.Value) any
```

The first argument appears to be standard and perhaps not even used
by the Go code in the function. It certainly isn't in this example.

The second argument is an array of `js.Value` and will contain the
parameters passed by the calling Javascript code.

This code will be a layer between the calling browser code and the 
real Go code to be executed. In this case, the real Go code is
the `prettyJson` function. This layer will take the provide arguments
and validate them and the pass them to the real function to do the
work. The value returned from the "real" function is then simply returned
to the calling code. In this case the returned value is always a
string. *Note: no error handling in this example, since the returned 
string will return a message in case of an error instead of formatted
JSON.

Now this code is compiled to WASM. There is still the matter of 
loading this WASM code into the Javascript environment. In this example, 
this loading code is in the HTML as a script. Here is it:

```html
    <script src="wasm_exec.js"></script>
    <script>
        const go = new Go();
        WebAssembly.instantiateStreaming(fetch("json.wasm"), go.importObject).then((result) => {
            go.run(result.instance);
        });
    </script>
```

The first script is part of the Go release and contains the `Go()` 
class used in the second script (see line 95).

There is no UI for this. When the function "formatJSON" is added to the
enviroment, you can run from the console. See tutorial for details.
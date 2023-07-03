package main

import (
	"syscall/js"
)

func Hello(this js.Value, args []js.Value) interface{} {
	message := args[0].String() // get the parameters
	return "Hello " + message
}

func main() {
	js.Global().Set("Hello", js.FuncOf(Hello))

	<-make(chan bool)
}

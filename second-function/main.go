package main

import (
	"syscall/js"
)

func Hello(this js.Value, args []js.Value) interface{} {

	firstName := args[0].String()
	lastName := args[1].String()

	return map[string]interface{}{
		"message": "👋 Hello " + firstName + " " + lastName,
		"author":  "@k33g_org",
	}

}

func main() {
	js.Global().Set("Hello", js.FuncOf(Hello))

	<-make(chan bool)
}

// PrettyPrintGoWasm.js

import Go from "wasm_exec.js";

const PrettyPrintGoWasm = async (jsonText) => {

    const go = new Go();

    await WebAssembly.instantiateStreaming(fetch("json.wasm"), go.importObject).then((result) => {
        go.run(result.instance);
    });

    return globalThis.formatJson(jsonText)
}

export default PrettyPrintGoWasm;
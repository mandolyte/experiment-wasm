// PrettyPrintGoWasm.js

import Go from "./wasm_exec.js";

const PrettyPrintGoWasm = async (jsonText) => {
    const go = new globalThis.Go();
    const url = 'main.wasm'
    await WebAssembly.instantiateStreaming(fetch(url), go.importObject).then((result) => {
        go.run(result.instance);
    });

    return globalThis.formatJson(jsonText)
}

export default PrettyPrintGoWasm;
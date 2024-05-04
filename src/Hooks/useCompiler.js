import { useEffect, useCallback, useState } from "react";
import * as compiler from 'compilex'


let useCompiler = (code) => {
    let passedata = null
    console.log(compiler);
    var options = { stats: true }; //prints stats on console 
    compiler.init(options);
    var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
    compiler.compileCPP(envData , code , function (data) {
        passedata = data;
    });

    return data
}

export default useCompiler
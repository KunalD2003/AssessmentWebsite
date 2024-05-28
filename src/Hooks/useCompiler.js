
import * as compiler from 'compilex'


let useCompiler = (code) => {
    console.log(compiler);
    var options = { stats: true }; //prints stats on console 
    compiler.init(options);
    var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
    compiler.compileCPP(envData , code , function (data) {
        passedata = data;
    });

}

export default useCompiler
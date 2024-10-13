const N3 = require('n3');
const fs = require('node:fs');

import { process_statement } from "./process_statements";
// (z:any,y:RdfObject) {

export function test_driver(callback:any) {
    callback.enter_test_driver();
    const parser = new N3.Parser();
    const rdfStream = fs.createReadStream('introspector.ttl');
    function wrapper(x:any,y:any){
	callback.wrapper_rdf();
//	console.log("wrapper1");
	process_statement(x,y,callback);
    }
    const quads = parser.parse(rdfStream, wrapper);
    callback.leave_test_driver();
}

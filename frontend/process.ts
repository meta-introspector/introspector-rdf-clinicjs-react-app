const N3 = require('n3');
const fs = require('node:fs');
//const url = require('node:url');
//import { isp_clinic_report } from "./clinic_report"
//import { Functions } from "./functions"
import { process_statement } from "./process_statements";

function test_driver() {
    const parser = new N3.Parser();
    const rdfStream = fs.createReadStream('introspector.ttl');
    const quads = parser.parse(rdfStream, process_statement);
}

test_driver();

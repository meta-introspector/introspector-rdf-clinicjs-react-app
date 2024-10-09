const N3 = require('n3');
const fs = require('node:fs');

import { process_statement } from "./process_statements";

export function test_driver() {
    const parser = new N3.Parser();
    const rdfStream = fs.createReadStream('introspector.ttl');
    const quads = parser.parse(rdfStream, process_statement);
}

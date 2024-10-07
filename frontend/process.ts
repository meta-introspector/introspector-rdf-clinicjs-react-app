const N3 = require('n3');
const fs = require('node:fs');
const parser = new N3.Parser();
const rdfStream = fs.createReadStream('introspector.ttl');

function isp_clinic_report(x: any, y:any) {
    console.log("isp_clinic_report: " + x._subject.id + "test" + y);
    return x._subject.id
}

function isp_self(x: any) {
    console.log("self"+ x);
}

function missing(x: any) {
    console.log("missing"+ x._object.id);
}

function rdf_type(type_obj: any, subj:any) {
    //const obj =  obj;
    console.log("rdf_type: type_obj" + type_obj);
    console.log("type_obj" + typeof(type_obj) );
    const instance = type_obj(subj);
    console.log("instance"+ instance );
    return instance;
    
}
function statement(x:any) {}

interface Functions {
  [key: string]: any;
}
const functions: Functions = {
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#Statement' : statement,
    'isp:clinic_report' : isp_clinic_report,
    'isp:self' : isp_self,
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': rdf_type
}

function foo2 (z:any,y:any) {
    //console.log(z);
    if (y) {
	const pred:string = y._predicate.id;
	const obj:string = y._object.id;
	const subj:string = y._subject.id;
	const pfun = functions[pred]; // type
	const ofun = functions[obj];  // isp_report
	if (pfun) {
	    if (ofun) {
		const type_obj = ofun(y);// isp report
		pfun(type_obj, subj); // type(isp_report, data
	    } else {
		functions[obj]=missing;
	    }
	}
    }
}

const quads = parser.parse(rdfStream, foo2);

function foo (z:any) {
	 	 console.log(typeof(z))
    return "FIXME" + z;
}

//quads.map(foo)
//console.log(typeof(quads))

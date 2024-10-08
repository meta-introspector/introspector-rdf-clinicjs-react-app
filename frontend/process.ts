const N3 = require('n3');
const fs = require('node:fs');
const url = require('node:url');

type TypeObjectCallback = (subject:string) => string;

interface RdfId {
    id: string
}

interface RdfObject {
    _subject: RdfId;
    _predicate: RdfId;
    _object: RdfId;
}

function missing(x: any) {
    console.log("missing"+ x._object.id);
}

interface Functions {
  [key: string]: any;
}

function statement(x:any) {
    return "fixme"
}

function isp_clinic_flame_report(report_url:string) {
    return "flame report" + report_url;
}

const clinic_functions: Functions = {
    'clinic-flame': isp_clinic_flame_report
}

function isp_clinic_report(report_url:string) {
    const reportUrl = new URL(report_url);
    const parts = reportUrl.pathname.split("/");
    const filename  = parts[parts.length-1];
    const fnparts  = filename.split(".")
    const fntype  = fnparts[fnparts.length -2];

    const callback = clinic_functions[fntype]
    if (callback) {
	return callback(report_url)
    } else {
	console.log("missing: " + fntype);
	clinic_functions[fntype] = missing;
    }
}

function isp_self(x: any) {
    console.log("self"+ x);
}

function rdf_type(type_function: TypeObjectCallback, subj:string) {
    //const obj =  obj;
    //console.log("rdf_type type_obj: " + type_obj);
//    console.log("type_obj:" + typeof(type_obj) );
    //console.log("rdf type subj:" + typeof(subj) );
    if (typeof(type_function)=="function") {
	const instance = type_function(subj);
	console.log("instance:"+ instance );
	return instance;
    }    
}

const functions: Functions = {
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#Statement' : statement,
    'isp:clinic_report' : isp_clinic_report,
    'isp:self' : isp_self,
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': rdf_type
}

function process_statement (z:any,y:RdfObject) {
    //console.log(z);
    if (y) {
	const obj:string = y._object.id;
	const ofun = functions[obj];  // isp_report	
	const pred:string = y._predicate.id;
	const pfun = functions[pred]; // type
	const subj:string = y._subject.id;
	if (pfun) {
	    if (ofun) {
		pfun(ofun, subj); // type(isp_report, data
	    } else {
		functions[obj]=missing;
	    }
	}
    }
}

function test_driver() {
    const parser = new N3.Parser();
    const rdfStream = fs.createReadStream('introspector.ttl');
    const quads = parser.parse(rdfStream, process_statement);
}

test_driver();

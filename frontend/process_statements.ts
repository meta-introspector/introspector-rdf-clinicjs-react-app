import { RdfObject } from "./rdf";
import { find_function, set_function } from "./rdf_callbacks";
import { missing } from "./missing";

export function process_statement (z:any,y:RdfObject) {
    //console.log(z);
    if (y) {
	const obj:string = y._object.id;
	const ofun = find_function(obj);  // isp_report	
	const pred:string = y._predicate.id;
	const pfun = find_function(pred); // type
	const subj:string = y._subject.id;
	if (pfun) {
	    if (ofun) {
		pfun(ofun, subj); // type(isp_report, data
	    } else {
		set_function(obj,missing);
	    }
	}
    }
}

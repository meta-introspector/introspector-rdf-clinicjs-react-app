import { RdfObject } from "./rdf";
import { find_function, set_function } from "./rdf_callbacks";
import { missing } from "./missing";

export function process_statement (z:any,y:RdfObject,callback:any) {
    //console.log(z);
    if (y) {
	callback.debug("process_statement");
	const obj:string = y._object.id;
	const ofun = find_function(obj,callback);  // isp_report	
	const pred:string = y._predicate.id;
	const pfun = find_function(pred,callback); // type
	const subj:string = y._subject.id;
	if (pfun) {
	    if (ofun) {
		callback.debug("pfun");
		pfun(ofun, subj, callback); // type(isp_report, data
	    } else {
		set_function(obj,missing);
	    }
	}
    }
}

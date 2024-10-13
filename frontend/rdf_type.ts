type TypeObjectCallback = (subject:string,callback:any) => string;

export function rdf_type(type_function: TypeObjectCallback, subj:string,callback:any) {
    //const obj =  obj;
    //console.log("rdf_type type_obj: " + type_obj);
//    console.log("type_obj:" + typeof(type_obj) );
    //console.log("rdf type subj:" + typeof(subj) );
    if (typeof(type_function)=="function") {
	callback.debug("rdf_type");
	const instance = type_function(subj,callback);
	//console.log("rdf_type instance:" + type_function + " result: "+ instance );
	return instance;
    }    
}

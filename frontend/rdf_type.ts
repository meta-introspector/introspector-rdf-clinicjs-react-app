type TypeObjectCallback = (subject:string) => string;

export function rdf_type(type_function: TypeObjectCallback, subj:string) {
    //const obj =  obj;
    //console.log("rdf_type type_obj: " + type_obj);
//    console.log("type_obj:" + typeof(type_obj) );
    //console.log("rdf type subj:" + typeof(subj) );
    if (typeof(type_function)=="function") {
	const instance = type_function(subj);
	//console.log("rdf_type instance:" + type_function + " result: "+ instance );
	return instance;
    }    
}

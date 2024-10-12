
import { test_driver } from "./test_driver";
//test_driver();

const dataForge = require('data-forge')
function add_to_frame(results:any,
		      name:any,
		      value:any) {
}
function find_calls(event:any,
		    filter:any) {
}

function create_find_function(visit_function:any,
			      filter_function:any
			     ) {
    return [0,1]
}

function test_frame(){

    let empty_frame =  new dataForge.DataFrame([]);

    function filter_function_name(function_name:string) {return true;}
    function visitor(event:any) {

        function visit_function_name(function_name:string, function_value:any) {
            add_to_frame(empty_frame,function_name, function_value);
    }
//    let find_functions = create_find_function(visit_function_name,filter_function_name)
	//    find_calls(event,find_functions);
    visitor.filter_current_value= filter_function_name; // save part of the callback
    test_driver(visitor);
    return empty_frame  
    };
}// test frame

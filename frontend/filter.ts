
import { test_driver } from "./test_driver";
//test_driver();

const dataForge = require('data-forge')
function add_to_frame(results:any,
		      name:any,
		      value:any) {

    console.log(name,value);
}
function find_calls(event:any,
		    filter:any) {
}

function create_find_function(visit_function:any,
			      filter_function:any
			     ) {
    return [0,1]
}

interface Introspector {
    (): any;
    filter_current_value: any;
    enter_test_driver:any
    leave_test_driver:any
    wrapper_rdf:any
    debug:any
}

function test_frame(){
    console.log("hello");
    let empty_frame =  new dataForge.DataFrame([]);
    function filter_function_name(function_name:string) {
	//console.log("filter");
	return true;
    }
    var visitor = <Introspector>function (event:any) {
	console.log("visitor");
        function visit_function_name(function_name:string, function_value:any) {
            add_to_frame(empty_frame,function_name, function_value);
	}
	//    let find_functions = create_find_function(visit_function_name,filter_function_name)
	//    find_calls(event,find_functions);
	return empty_frame  
    };

    visitor.filter_current_value= filter_function_name; // save part of the callback
    visitor.enter_test_driver= function(){
	//console.log("enter the test driver");
    }
    visitor.debug= function(x:any){
	//console.log("debug",x);
    }
    visitor.wrapper_rdf= function(){
	//console.log("rdf");
    }
    visitor.leave_test_driver= function(){
	//console.log("leave the test driver");
    }
    test_driver(visitor);
}// test frame


test_frame();

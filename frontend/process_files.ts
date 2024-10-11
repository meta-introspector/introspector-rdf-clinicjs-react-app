import { Functions } from "./functions"
import { missing } from "./missing"
import { associate_cache, save_cache } from "./cache"
const fs = require('node:fs');
function process_chunk(line:string)
{
    const chunk = line;
    let obj = JSON.parse(chunk)    
    return obj;
}

export interface iFile {
    //children: iFrame[];
};

function file_test(f: iFile){
    function report_child(previousValue: iFile, currentValue: iFile, currentIndex: number, array: iFile[]): iFile {
	let sum = 0;
	if (currentValue){
	    sum = sum + file_test(currentValue); // add the children
	}
	let ret  = {value: sum} as iFile // return a new object with just the value
	return ret;
    }
    //    let res = f.children.reduce(report_child,{} as iFile); //recurse
    //let res = 0;
    return 0;
}

function createRunningSumFunctor(f:any) {
    let objects:object[] = [];
    let sum:string = "";
    
    function process(value?: string): number {
	if (value !== undefined) {
	    sum = sum + value;
	}
	return 0;
    };
    function report(): number {
	let obj = JSON.parse(sum)
	return obj;
    };
    return [process,report];
}

function process_data(filename:string, data:string) {
    let [sumfunc,report_func] = createRunningSumFunctor(process_chunk);
    if (data) {
	data.split("\n").forEach(sumfunc);
    }
    let sum:any = report_func()


    function reducesum(value:any, parent_name1:string){

	let name1 = parent_name1 + "/" + "unknown";
	
	// function report2(value:any,index:any){
	//     console.log("report2",value,index);
	// }

	//console.log("reducesum",value);

	function report3(empty:any,value:any, parent_name:string){
	    //console.log("report3val:",value);

	    if (value){
		let name = parent_name + "/" + "unknown";
		if (value.name) {
		    name  = parent_name + "/" + value.name
		}
		if (value.contents) {
		    console.log("contents2:",value.contents.length, name);
		    function wrapper(empty:any,value:any){
			report3(empty,value,name);
		    }
		    value.contents.reduce(wrapper);
		}
		else {
		    console.log("file:",name);
		}

	    }
	    //console.log("report3 name:",name1);
	}

	if (value) {

	    if (value.name) {
		name1  = parent_name1 + "/" + value.name
	    }

	    //Object.getOwnPropertyNames(value).forEach(report2);
	    if (value.contents) {
		//		console.log("contents len:",value.contents.length);
		console.log("contents name, len:",name1, value.contents.length);
		function wrapper(empty:any,value:any){
		    report3(empty,value,name1);
		}
		value.contents.reduce(wrapper);
	    }
	}
    }


    function wrapper(value:any){
	reducesum(value, "");
    }	
    sum.reduce(wrapper);
    function report(value:any,index:any){
	console.log("report1",value,index);
    }
    Object.getOwnPropertyNames(sum).forEach(report);    
    console.log("Check: " + filename + "sum : " + sum);
    return sum;
}

function createProcessor(filename:string) {
    return function(err:any, data:string) {	
	return process_data(filename, data);
    }
}

function tree_json_file_parser(filename:string) {
    console.log("file: " + filename);
    let functor = createProcessor(filename);
    fs.readFile(filename, "utf-8",functor);
    return "json_report:";
}

export function read_file() {
    tree_json_file_parser("../files.json")
}

read_file();

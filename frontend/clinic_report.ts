import { Functions } from "./functions"
import { missing } from "./missing"
import { associate_cache, save_cache } from "./cache"

const fs = require('node:fs');


function process_chunk(line:string)
{
    const begins = "module.exports="
    if (line.includes("childrenVisibilityToggle") && (line.includes(begins))) {
	const bl = begins.length;
	//console.log("chunk: " + line.substring(bl,20));
	const chunk = line.substring(bl,line.length);
	let obj = JSON.parse(chunk)
	//let runnable = eval(line);
	//runnable.Run("module.exports").then((result:string)=>{console.log(result);});
	// console.log(JSON.stringify(obj,null,2));
	return obj;
    }
    return undefined;
}

export interface iFrame {
    id: number;
    name: string;
    fileName: string;
    functionName: string;
    lineNumber: number;
    columnNumber: number;
    target: string;
    type: string;
    category: string;
    isOptimized: boolean,
    isUnoptimized: boolean;
    isInlinable: boolean;
    isInit: boolean;
    isWasm: boolean;
    value: number;
    onStackTop: any;
    children: iFrame[];
};

//Object.getOwnPropertyNames(obj).forEach(report);
//appName
//pathSeparator
//codeAreas
//merged
//unmerged


function frame_test(f: iFrame,parent:string){
    function report_child(previousValue: iFrame, currentValue: iFrame, currentIndex: number,
			  array: iFrame[],
			  parent_name:string): iFrame {

	if (! currentValue.name.includes("o1js")) {
	    return {value: 0} as iFrame // return a new object with just the value
	}
	const name = parent_name + "|" +currentValue.name;
	console.log(
	    "previousValue",
	    JSON.stringify(previousValue).length);
	//console.log("previousValue.name",previousValue.name);
	console.log("currentValue",JSON.stringify(currentValue).length);
	//console.log("name",currentValue.name);

	console.log("name",name);
	console.log("functionName",currentValue.functionName);
	//console.log("type",currentValue.type); v8
	//console.log("target",currentValue.target); empty
	//console.log("category",currentValue.category);  all-v8
	
	console.log("currentIndex",JSON.stringify(currentIndex));
	console.log("array",JSON.stringify(array.length))
	
	console.log("array[*] join name",array.map( (x) => x.name).join("|"))
	
	let sum = 0;
	if (currentValue){
	    sum = sum + currentValue.value; // add the current value
	    sum = sum + frame_test(currentValue,name); // add the children
	}
	let ret  = {value: sum} as iFrame // return a new object with just the value
	return ret;
    }
    
    function wrapper(previousValue: iFrame, currentValue: iFrame, currentIndex: number, array: iFrame[]): iFrame {
	return report_child(previousValue,
			    currentValue,
			    currentIndex,
			    array,
			    parent);
    }
    let res = f.children.reduce(wrapper,{value:f.value} as iFrame); //recurse
    //console.log(JSON.stringify(res.value));
    return res.value;
}

function createRunningSumFunctor(f:any) {
    let objects:object[] = [];
    let sum:number = 0;
    return function(value?: string): number {
	if (value !== undefined) {
	    const obj = f(value);// apply f
	    if (obj !== undefined) {
		function report_child(value:object,index:number){
		    if (value){
			let res = frame_test(value as iFrame, "root");
			sum = sum + res
		    }
		}
		//obj.merged.children.forEach(report);
		obj.unmerged.children.forEach(report_child);		
		//obj.merged.forEach(report);
		//obj.unmerged.forEach(report);
		
		//sum.push(obj);
	    }
	}
	return sum;
    };
}

function process_flame_report(filename:string, data:string) {
    let sumfunc:any = createRunningSumFunctor(process_chunk);
    if (data) {
	data.split("\n").forEach(sumfunc);
    }
    let sum:number = sumfunc();
    console.log(filename + "sum : " + sum);
    return sum;
}

function createProcessor(filename:string) {
    return function(err:any, data:string) {	
	return process_flame_report(filename, data);
    }
}

function isp_clinic_flame_report(report_url:string, data:any) {
    //console.log("file: " + data.newpath);
    let functor = createProcessor(data.newpath);
    fs.readFile(data.newpath, "utf-8",functor);
    return "flame report:" + report_url;
}

const clinic_functions: Functions = {
    'clinic-flame': isp_clinic_flame_report
}

export function isp_clinic_report(report_url:string) {
    const reportUrl = new URL(report_url);
    const parts = reportUrl.pathname.split("/");
    const hostname = reportUrl.hostname;
    const filename  = parts[parts.length-1];
    const fnparts  = filename.split(".")
    const fntype  = fnparts[fnparts.length -2];

    const callback = clinic_functions[fntype]
    // now lets construct a cache
    const cached = associate_cache(report_url,hostname,parts,fnparts);
    var data = "missing";

    if (callback) {
	data = callback(report_url, cached);
    } else {
	console.log("missing: " + fntype);
	clinic_functions[fntype] = missing;
    }

    return save_cache(report_url, hostname, parts, fnparts, cached,data);
}

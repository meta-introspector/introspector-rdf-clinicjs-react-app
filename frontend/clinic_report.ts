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
	console.log(obj);
    }


    "}"
}

function process_flame_report(err:any, data:string) {
    //console.log("data: %o", data);
    if (data) {	
	data.split("\n").forEach(process_chunk);
    }
   


}

function isp_clinic_flame_report(report_url:string, data:any) {   
    console.log("file: " + data.newpath);
    fs.readFile(data.newpath, "utf-8",process_flame_report);

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


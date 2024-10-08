import { Functions } from "./functions"
import { missing } from "./missing"

function isp_clinic_flame_report(report_url:string) {
    return "flame report" + report_url;
}

const clinic_functions: Functions = {
    'clinic-flame': isp_clinic_flame_report
}

export function isp_clinic_report(report_url:string) {
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

export function forward() {

}

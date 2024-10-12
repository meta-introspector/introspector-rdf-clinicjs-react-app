import { Functions } from "./functions";
import { statement } from "./statement";
import { isp_clinic_report } from "./clinic_report";
import { isp_self } from "./introspector";
import { rdf_type } from "./rdf_type";

const functions: Functions = {
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#Statement' : statement,
    'isp:clinic_report' : isp_clinic_report,
    'isp:self' : isp_self,
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': rdf_type
}

export function find_function(x:string, callback:any) {
    // skip callback for now
    return functions[x];
}

export type Callback = (x: any) => void;
export function set_function(x:string,y:Callback) {
    return functions[x]=y;
}

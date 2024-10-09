//
export function associate_cache(url: string,
				hostname: string,
				url_parts :string[],
				fn_parts:string[]) {
    const alen = url_parts.length-1;
    //const filename  = url_parts[url_parts.length-1];
    //console.log("cache url: " + url);
    //console.log("cache: parts:" + url_parts.slice(6,alen +1));
    const hostname_base = hostname.split(".")[0]
    const newpath = "../inputs/" + hostname_base + url_parts.slice(0,4).join("/") + "/"+ fn_parts.join(".");
    //console.log("cache: slice:" + newpath);
    //const htmlStream = fs.createReadStream(newpath);
    return {
	"newpath" : newpath
    };    
}

export function save_cache(url:string,
			   hostname: string,
			   url_parts:string[],
			   fn_parts: string[],
			   cached:any,
			   results:any) {}

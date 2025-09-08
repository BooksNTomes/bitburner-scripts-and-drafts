/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    const home = "home";

    let path = [target];
    while (path[0] !== home){
        let connectedServers = ns.scan(path[0]);
        path.unshift(connectedServers[0]);
    }

    let printedPath = "";
    for (let i = 0; i < path.length; i++){
        let pathString = `${path[i]}`;
        if (i+1 >= path.length){
            printedPath += pathString;
        }
        else {
            printedPath += `${pathString} ->`;
        }
    }
    ns.tprintf(printedPath);
}

/** @param {NS} ns */
export async function main(ns) {

    const targetServer = ns.args[0];
    
    /** This script kickstarts the gwh-loop process 
     * and is also used for resetting the whole process */
    
    ns.exec("utils/automate/killall.js", "home", 1);
    await ns.sleep(5000);
    ns.exec("hack/hgw/scp.js", "home", 1);
    await ns.sleep(5000);
    ns.exec("hack/hgw/manager.js", "home", 1, target);

}
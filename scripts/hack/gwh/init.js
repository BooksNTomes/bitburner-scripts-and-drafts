/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];

    /** This script kickstarts the gwh-loop process 
     * and is also used for resetting the whole process */
    
    ns.exec("utils/automate/killall.js", "home", 1);
    await ns.sleep(5000);
    ns.exec("hack/gwh/scp.js", "home", 1);
    await ns.sleep(5000);
    ns.exec("hack/gwh/manager.js", "home", 1, target);
}
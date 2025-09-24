/** @param {NS} ns */
export async function main(ns) {
    const initialMemory = 1;
    const maximumMemory = 524288000;

    for (let i = initialMemory; i < maximumMemory; i**2){
        ns.exec("pserv/purchase.js", "home", 1, initialMemory);

    }
}
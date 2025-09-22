/** @param {NS} ns */
export async function main(ns) {

    //** This script serves as a shortcut call to other utilty scripts*/
    const command = ns.args[0];

    switch(command){
        case 'scan-note':
            ns.exec('utils/scan/note.js', 'home', 1);
            break;
        case 'crack':
            ns.exec('utils/automate/crack.js', 'home', 1);
            break;
        case 'share':
            const ram = Math.floor(ns.getServerMaxRam('home') / 2);
            ns.exec('utils/faction/share.js', 'home', ram);
            break;
        default:
            break;
    }
}
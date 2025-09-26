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
            ns.exec('utils/faction/share.js', 'home', 1, ram);
            break;
        case 'pserv':
            ns.exec('utils/automate/pserv.js', 'home', 1);
            break;
        case 'hacknet':
            ns.exec('utils/automate/hacknet.js', 'home', 1);
            break;
        case 'keypoints':
            ns.exec('utils/scan/keypoints.js', 'home', 1, false);
            break;
        case 'redPillPoints':
            ns.exec('utils/scan/keypoints.js', 'home', 1, true);
            break;
        default:
            break;
    }
}
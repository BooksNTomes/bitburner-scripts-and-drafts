/** @param {NS} ns */
export async function main(ns) {
    const gang = ns.gang;

    try {
        ns.print('getBonusTime()', gang.getBonusTime()); 
        // 	Get bonus time.
    
        ns.print('getEquipmentNames()', gang.getEquipmentNames()); 
        // 	List equipment names.
    
        ns.print('getGangInformation()', gang.getGangInformation()); 
        // 	Get information about your gang.
    
        ns.print('getMemberNames()', gang.getMemberNames()); 
        // 	List all gang members.
    
        ns.print('getOtherGangInformation()', gang.getOtherGangInformation()) 
        // 	Get information about the other gangs.
    
        ns.print('getRecruitsAvailable()', gang.getRecruitsAvailable()); 
        // 	Check how many gang members you can currently recruit.
    } catch (error) {
        ns.print(`Error encountered in gangStats: ${error}`)
    }
}



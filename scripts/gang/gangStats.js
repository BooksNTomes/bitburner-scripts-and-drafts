/** @param {NS} ns */
export async function main(ns) {
    const gang = ns.gang;

    try {
        console.log('getBonusTime()', gang.getBonusTime()); 
        // 	Get bonus time.
    
        console.log('getEquipmentNames()', gang.getEquipmentNames()); 
        // 	List equipment names.
    
        console.log('getGangInformation()', gang.getGangInformation()); 
        // 	Get information about your gang.
    
        console.log('getMemberNames()', gang.getMemberNames()); 
        // 	List all gang members.
    
        console.log('getOtherGangInformation()', gang.getOtherGangInformation()) 
        // 	Get information about the other gangs.
    
        console.log('getRecruitsAvailable()', gang.getRecruitsAvailable()); 
        // 	Check how many gang members you can currently recruit.
    } catch (error) {
        console.log(`Error encountered in gangStats: ${error}`)
    }
}



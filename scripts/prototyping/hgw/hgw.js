/** @param {NS} ns */
export async function main(ns) {

    /** This script is an attempt to make the HGW algorithm work and optimize profits. */
    let timeParams = [];
    let targettedServer;
    let data = [];
    
    while (true){
        /** We'll need these functions to figure out how to optimize the hack grow weaken flow */
        timeParams = [  ns.getHackTime(targettedServer), 
                        ns.getGrowTime(targettedServer), 
                        ns.getWeakenTime(targettedServer)];

        /** We'll then need to execute the scripts using server data, with the required threads, and as
         * well as the proper timing, using await.sleep(optimal milliseconds)
         */

        const datamanager = (servers, timeParams) => {
            let data = [];
                // insert datamanager.js script here.
            return data;
        }

        /** Optimizing the loop, and possibly sustainably:
         *  * - execution period - most important part is the end, as the end is the trigger point.
         *  & - sleep duration - to enable synchronization, even if it results in not 'the most optimized per millisecond' algorithm
         * 
         * weaken usually takes longest:                **************&&&
         * grow does not take as long:                       **********&&
         * hack takes the fastest, and must be delayed:             ****&
         * 
         */

        for (let i = 0; i < data.length; i++){
            // Based on hacktime/growtime/weakentime calculations, execute script with needed time
            ns.exec(`scp/${data[i].script}.js`, data[i].serverName, data[i].threads, targettedServer);
            await ns.sleep(data[i].executionTime)
        }

        await ns.sleep(10000);
    }


}
/** @param {NS} ns */
export async function main(ns) {

    const targetServer = ns.args[0];
    
    while (true){

        hackTime = ns.getHackTime(targetServer);
        growTime = ns.getGrowTime(targetServer);
        weakenTime = ns.getWeakenTime(targetServer);

        function getData(ns) {
            const avgScriptRam = 1.75;

            let servers = ['home'];
            for (let i = 0; i < servers.length; i++){
                let neighbors = ns.scan(servers[i]);

                for (let j = 0; j<neighbors.length; j++){
                    if (!servers.includes(neighbors[j])) {
                        servers.push(neighbors[j]);
                    }
                }
            }
            servers = servers.filter((server) => server !== "home");


            let totalRam = 0;
            for (let i = 0; i < servers.length; i++){
                let server = servers[i];
                let ports = ns.getServer(server).openPortCount;
                if (ports === ns.getServerNumPortsRequired(server) || server.includes(pserv)){
                    totalRam += ns.getServerMaxRam(server);
                }
            }

            const totalThreads = (totalRam / Math.ceil(avgScriptRam));
            let hackThreadRatio = .10;
            let growThreadRatio = .45;
            let weakenThreadRatio = .45;
            
            let hackThreads = Math.floor(hackThreadRatio * totalThreads);
            let groThreads = Math.floor(growThreadRatio * totalThreads);
            let weakenThreads = Math.floor(weakenThreadRatio * totalThreads);

            if (hackThreads === 0){
              hackThreads = 1;
              groThreads = groThreads - 1;
            }

            let gi = hackThreads;
            let wi = hackThreads + groThreads;

            // Create Data List
            let threads = 0
            for (let i = 0; i < servers.length; i++){
                let server = servers[i];
                let ports = ns.getServer(server).openPortCount;
                let maxThreads = ns.getServerMaxRam(server) / Math.ceil(avgScriptRam);
                let addedThreads = 0;
                
                if (threads < gi && (ports === ns.getServerNumPortsRequired(server) || server.includes(pserv))){
                    let currAddedThreads = 0;
                    while (threads + addedThreads < gi && addedThreads < maxThreads){
                        addedThreads+=1;
                        currAddedThreads+=1;
                    }
                    if (currAddedThreads !== 0){
                        data.push({
                          serverName: server,
                          script: 'hack',
                          threads: currAddedThreads,
                        })
                    }
                    threads += currAddedThreads;
                }
                
                if (threads < wi && (ports === ns.getServerNumPortsRequired(server) || server.includes(pserv))){
                    let currAddedThreads = 0;
                    while (threads + addedThreads < wi && addedThreads < maxThreads){
                        addedThreads+=1;
                        currAddedThreads+=1;
                    }
                    if (currAddedThreads !== 0){
                        data.push({
                          serverName: server,
                          script: 'weaken',
                          threads: currAddedThreads,
                        })
                    }
                    threads += currAddedThreads;
                }
                
                if (threads >= wi && (ports === ns.getServerNumPortsRequired(server) || server.includes(pserv))) {
                    let currAddedThreads = 0;
                    while (threads + addedThreads >= wi && addedThreads < maxThreads){
                        addedThreads+=1;
                        currAddedThreads+=1;
                    }
                    if (currAddedThreads !== 0){
                        data.push({
                          serverName: server,
                          script: 'grow',
                          threads: currAddedThreads,
                        })
                    }
                    threads += currAddedThreads;
                }
            }

            let returnData = [[],[],[]]

            for (let i = 0; i < data.length; i++){
                if (data[i].script === 'weaken'){
                    returnData[0].push(data[i]);
                }
                else if (data[i].script === 'grow'){
                    returnData[1].push(data[i]);
                }
                else if (data[i].script === 'hack'){
                    returnData[2].push(data[i]);
                }
            }

            return { weakenCrew, growCrew, hackCrew };
        }

        // Weaken - Grow - Weaken - Hack
        const { weakenCrew, growCrew, hackCrew } = getData()

        // TODO: Improve cycles
        for (let i = 0; i < 4; i++){
            let script;
            let crew;

            /** *****************************************************| */
            if (i === 0){
                script = 'weaken';
                crew = weakenCrew;
                await ns.sleep(0);
            }
            /**                      **********************************| */
            else if (i === 1){
                script = 'grow';
                crew = growCrew;
                await ns.sleep((weakenTime + 200) - growTime);
            }
            /**                      ***********************************| */
            else if (i === 2){
                script = 'weaken';
                crew = weakenCrew;
                await ns.sleep((weakenTime + 200) - growTime)
            }
            /**                                                ***********| */
            else if (i === HACK){
                script = 'hack';
                crew = hackCrew;
                await ns.sleep(((weakenTime + 400)) - hackTime);
            }

            for (let j = 0; j < crew.length; j++) {
                ns.exec(`scp/hgw/${script}.js`, data[j].serverName, data[j].threads, targetServer);
            }

        }

        await ns.sleep(1000);
    }

}
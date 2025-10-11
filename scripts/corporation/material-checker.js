/** @param {NS} ns */
export async function main(ns) {
    const corporation = ns.corporation;

    /** Experiment: checking for material stats */
    const materials = ['Water', 'Chemicals', 'Food', 'Plants'];

    while (true){
        for (let i = 0; i < materials.length; i++){
            ns.print(getMaterialData(materials[i]));
        }
    }

    /** Experiment: simulate production */
    /**
     * 0.5 Water + 0.2 Chemicals => 1 Food + 1 Plants
     */
}



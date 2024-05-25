import { diceRoll } from "./rng.js";
import { 
    mental_illness_table_data,
    race_table_data,
    gender_table_data,
} from "./data/tabledata.js"

class TableEntry{
    /**
     * @param {string} key
     * @param {string} value
     */
    constructor(key, value){
        let range = this.processrange(key)
        this.lower = range[0]
        this.upper = range[1]
        this.value = value
        this.rerolls = 0
        if(value.includes("REROLL")){
            let rerolls = value.replace("REROLL", "")
            this.rerolls = Number(rerolls)
        }
    }

    processrange(key){
        let match = key.match(/^\s*([0-9]+)\s*$/)
        if(match){
            return [match[1], match[1]]
        }
        match = key.match(/^\s*([0-9]+)\s*-\s*([0-9]+)\s*$/)
        if(match){
            return [match[1], match[2]]
        }
        throw RangeError
    }
}

class RollableTable{
    /**
     * @param {dict} table 
     */
    constructor(table, diceroll = "1d100"){
        this.lower = Number.MAX_VALUE
        this.upper = 0
        this.entries = []
        for(let key in table){
            let entry = new TableEntry(key, table[key])
            this.entries.push(entry)
            this.entries.sort(function(a,b){
                return a.lower<b.lower ? -1 : (a.lower>b.lower ? 1 : 0)
            })
            this.lower = Math.min(this.lower, entry.lower)
            this.upper = Math.max(this.upper, entry.upper)
        }
        this.dicenum = 1
        this.dicesize = 100
        let dicematch = diceroll.match(/^\s*([0-9]+)\s*d\s*([0-9]+)\s*$/)
        if(dicematch){
            this.dicenum = dicematch[1]
            this.dicesize = dicematch[2]
        }
    }

    /**
     * @param {number} index 
     */
    entryAt(index){
        if(index < this.lower){
            return this.entries[0]
        }
        if(index > this.upper){
            return this.entries[this.entries.length-1]
        }
        for(let e_index = 0; e_index < this.entries.length; ++e_index){
            let entry = this.entries[e_index]
            if(entry.lower <= index && index <= entry.upper){
                return entry
            }
        }
    }

    /**
     * @param {number} numrolls 
     */
    random(numrolls = 1, firstonly = false, modifier = 0){
        let results = []
        for(let roll = 0; roll < numrolls; ++roll){
            let pick = diceRoll(this.dicenum, this.dicesize)
            let entry = this.entryAt(pick)
            if(entry.rerolls > 0){
                results.push(...this.random(entry.rerolls))
            } else{
                results.push(entry.value)
            }
        }
        results = firstonly ? results[0] : results
        return results
    }
}

var mental_illness_table = new RollableTable(mental_illness_table_data, "1d1000");
var race_table = new RollableTable(race_table_data, "1d100");
var gender_table = new RollableTable(gender_table_data, "1d100");

export {
    mental_illness_table,
    race_table,
    gender_table,
};
import { diceRoll } from "./rng.js";
import { ability_keys } from "./data/abilitydata.js";
import { race_table, gender_table } from "./tables.js";

class Character{
    constructor(){
        this.race = race_table.random(1, true)
        let gendermod = this.race in ["Anakim", "Ogre", "Troll"] ? 10 : 0
        this.gender = gender_table.random(1, true, gendermod)
        this.abilities = {}
        this.subabilities = {}
        for (var ability in ability_keys){
            let a_score = 0
            let sa_dict = {}
            for (var i in ability_keys[ability]){
                let subability = ability_keys[ability][i]
                let sa_score = Math.floor(diceRoll(10, 100) / 5 - 1)
                sa_dict[subability] = sa_score
                a_score += sa_score
            }
            a_score = Math.floor(a_score / 4)
            this.abilities[ability] = a_score
            this.subabilities[ability] = sa_dict
        }
    }
}

export { Character };
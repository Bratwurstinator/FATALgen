import { renderStats } from "./utils.js";
import { mental_illness_table } from "./tables.js"
import { Character } from "./character.js"

window.onload = function() {
    let character = new Character()
    renderStats(character)
    console.log(character)
    console.log(mental_illness_table.random())
}
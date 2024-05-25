/**
 * @param {number} start lowest value, inclusive
 * @param {number} end highest value, inclusive
 */
function randInt(start, end){
    return Math.round(Math.random() * (end-start)) + start
}

/**
 * @param {number} count number of dice to sum
 * @param {number} size size of dice to sum
 */
function diceRoll(count, size){
    let sum = 0
    for (let i = 0; i < count; ++i){
        sum += randInt(1, size)
    }
    return sum
}

export { diceRoll, randInt };

function flattenDict(dictToFlatten) {
    function flatten(dict, parent) {
        var keys = [];
        var values = [];

        for(var key in dict) {
            console.log(key)
            if(typeof dict[key] === 'object') {
                var result = flatten(dict[key], parent ? parent + '_' + key : key);
                keys = keys.concat(result.keys);
                values = values.concat(result.values);
            }
            else {
                keys.push(parent ? parent + '_' + key : key);
                values.push(dict[key]);
            }
        }

        return {
            keys : keys,
            values : values
        }
    }

    var result = flatten(dictToFlatten);
    var flatDict = {};

    for(var i = 0, end = result.keys.length; i < end; i++) {
        flatDict[result.keys[i]] = result.values[i];
    }

    return flatDict;
}

/**
 * @param {dict} stats 
 */
function renderStats(stats){
    let squashedstats = flattenDict(stats)
    let statlist = document.getElementById("statlist")
    for (var key in squashedstats){
        let entry = document.createElement("p")
        entry.innerHTML = `${key}: ${squashedstats[key]}`
        statlist.appendChild(entry)
    }
}

export { renderStats }
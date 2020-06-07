let reps = require('./jsonfiles/representativesCleaned.json');
let districtsfile = require('./jsonfiles/districts.json');
var zipcodes = require('zipcodes');
var finder = require('congressional-district-finder');

async function getRepInfo(zip) {
    if (!isZipcodeValid(zip)) {
        console.log('invalid zip');
        return {};
    } 
    const lat = zipcodes.lookup(zip).latitude;
    const long = zipcodes.lookup(zip).longitude;
    const state = zipcodes.lookup(zip).state;
    
    var matchedDistrict = '';
    const districtsArray = districtsfile[state];
    for (var i = 0; i < districtsArray.length; i++) {
        var aDistrict = districtsArray[i];
        var supposedMatchedDistrict = (await getDistrict(lat, long, aDistrict));
        if (supposedMatchedDistrict) {
            matchedDistrict = supposedMatchedDistrict;
            break;
        }
    }
    // console.log('matchedDistrict = ' + matchedDistrict);
    // now that we have the matched district based on the inputted zip code...
    var localRep = reps[matchedDistrict];
    return localRep;
}

async function getDistrict(lat, long, z) {
    var matched = '';
    await finder.checkLatLngInDistrict(lat,long, z)
    .then(function(result) {
        matched = result.isMatched ? z : '';
    });
    return matched;
}

function isZipcodeValid(zip) {
    const isValidZip = zipcodes.lookup(zip) ? true : false;
    return isValidZip;
}

// for example purposes
async function main() {
    var repInfo = await getRepInfo('08807');
    console.log(repInfo.name);
    console.log(repInfo.district);
    console.log(repInfo.phonenumber);
}

// module.exports = { getRepInfo }
export default getRepInfo;
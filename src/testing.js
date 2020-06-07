// let representatives = require('./representatives.json');

// console.log(representatives.MemberData.members.member[0].statedistrict); // specific district AK00

// console.log(representatives.MemberData.members.member[0]['member-info'].courtesy); // Mr.

// console.log(representatives.MemberData.members.member[0]['member-info']['official-name']); // Don Young

// console.log(representatives.MemberData.members.member[0]['member-info'].phone); // Phone number (202) 225-5765

// var jsondata = {};

// for (var i = 0; i < representatives.MemberData.members.member.length; i++) {
//     var district = representatives.MemberData.members.member[i].statedistrict;
//     var district_state = district.slice(0,2);
//     var district_number = district.slice(2,4);
//     var x = parseInt(district_number);
//     district = district_state + '-' + x;
//     // const courtesy = representatives.MemberData.members.member[i]['member-info'].courtesy;
//     const fullName = representatives.MemberData.members.member[i]['member-info']['official-name'];
//     let phoneNumber = representatives.MemberData.members.member[i]['member-info'].phone;
//     phoneNumber = phoneNumber.slice(1,4) + phoneNumber.slice(6,9) + phoneNumber.slice(10,14);
//     jsondata[district] = {
//         'name':fullName,
//         'district':district,
//         'phonenumber':phoneNumber
//     }
// }

// var data = JSON.stringify(jsondata);
// var fs = require('fs');
// fs.writeFile("representativesCleaned.json", data, (err) => { 
//     // In case of a error throw err. 
//     if (err) throw err; 
// });

// -----------------------------------------------------------------------------------------------




// let senators = require('./senate.json');

// console.log(senators.contact_information.member[0].state); // senator state

// console.log(senators.contact_information.member[0].first_name); // first name

// console.log(senators.contact_information.member[0].last_name); // last name

// console.log(senators.contact_information.member[0].phone); // phonenumber (202) 224-5623

// var jsondata = {};

// for (var i = 0; i < senators.contact_information.member.length; i++) {
//     const state = senators.contact_information.member[i].state;
//     const firstname = senators.contact_information.member[i].first_name;
//     const lastname = senators.contact_information.member[i].last_name;
//     const fullName = firstname + ' ' + lastname;
//     let phoneNumber = senators.contact_information.member[i].phone;
//     phoneNumber = phoneNumber.slice(1,4) + phoneNumber.slice(6,9) + phoneNumber.slice(10,14);
//     if (jsondata[state]) {
//         jsondata[state].push({
//             'name':fullName,
//             'state':state,
//             'phonenumber':phoneNumber
//         });
//     } else {
//         jsondata[state] = [{
//             'name':fullName,
//             'state':state,
//             'phonenumber':phoneNumber
//         }]
//     }
//     if (i == 0) {
//         console.log(jsondata);
//     }
// }

// var data = JSON.stringify(jsondata);
// var fs = require('fs');
// fs.writeFile("senatorsCleaned.json", data, (err) => { 
//     // In case of a error throw err. 
//     if (err) throw err; 
// });

// -----------------------------------------------------------------------------------------------


// let senators = require('./senatorsCleaned.json');

// console.log(senators);

// let reps = require('./representativesCleaned.json');

// console.log(reps);

// -----------------------------------------------------------------------------------------------

// File format of senatorsCleaned.json:
// {
//     stateinitial : [
//         {name of senator : name, state of senator : state, phonenumber of senator : phonenumber},
//         {name of senator : name, state of senator : state, phonenumber of senator : phonenumber}
//     ], ...
// }

// Example:
// FL: [
//     { name: 'Marco Rubio', state: 'FL', phonenumber: '2022243041' },
//     { name: 'Rick Scott', state: 'FL', phonenumber: '2022245274' }
// ]

// -----------------------------------------------------------------------------------------------

// File format of representativesCleaned.json:
// {
//     district : {
//         {name of rep : name, district of rep : state, phonenumber of rep : phonenumber},
//         {name of rep : name, district of rep : state, phonenumber of rep : phonenumber}
//     }, ...
// }

// Example:
// WV03 : {
//     name: 'Carol D. Miller', district: 'WV03', phonenumber: '2022253452'
// }






// var finder = require('congressional-district-finder');
 
// finder.checkLatLngInDistrict(40.5940, -74.6049, 'NJ-7')
//     .then(function(result) {
//         console.log(result);
//     });


// var jsondata = {};
// var states = [];
// finder.getDistricts()
//     .then(function(result) {
//         for (var i = 0; i < result.districts.length; i++) {
//             // console.log(result.districts[i]);
//             // console.log(result.districts[i].slice(0,2));
//             var abbrev = result.districts[i].slice(0,2);
//             if (states.includes(abbrev)) {
//                 continue;
//             } else {
//                 states.push(abbrev);
//             }
//         }
//         // console.log(states);
//         for (var i = 0; i < result.districts.length; i++) {
//             var abbrev = result.districts[i].slice(0,2);
//             if (jsondata[abbrev]) {
//                 jsondata[abbrev].push(result.districts[i]);
//             } else {
//                 jsondata[abbrev] = [result.districts[i]];
//             }
//         }
//         console.log(jsondata);
//         var data = JSON.stringify(jsondata);
//         var fs = require('fs');
//         fs.writeFile("districts.json", data, (err) => { 
//             // In case of a error throw err. 
//             if (err) throw err; 
//         });
//     });

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

async function main() {
    var repInfo = await getRepInfo('08807');
    console.log(repInfo.name);
    console.log(repInfo.district);
    console.log(repInfo.phonenumber);
}

main();
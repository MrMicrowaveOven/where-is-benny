const location_names = ["Good Friends", "Raw Hide", "Bourbon Pub", "Oz", "Cafe Lafitte's in Exile", "Grand Pre's", "American Townhouse", "Phoenix"]

export default locations = [
    {
        name: 'Good Friends',
        corners: [
            [29.95996986514446, -90.0658767867858],
            [29.960074435977237, -90.06578089781569],
            [29.959971607992603, -90.06564075239784],
            [29.959882141749905, -90.06574133523361],
        ],
        image_url: ''
    },
    {
        name: `Raw Hide`,
        corners: [
            [29.960517437230298, -90.06683270281823],
            [29.960678940136066, -90.06668518132577],
            [29.960605741009847, -90.06656448192282],
            [29.9604506283976, -90.06672005004216],
        ],
        image_url: ``
    },
    {
        name: `GrandPre's`,
        corners: [
            [29.961837338195433, -90.0670948887413],
            [29.961886137014247, -90.06703386848757],
            [29.961754844899676, -90.06682197398021],
            [29.961688617838014, -90.06685952490557],
        ],
        image_url: ``
    }
]

const gpsLocation = [29.959905698993555, -90.06580675788258]

const whereIsBenny = (gpsLocation) => {
    // console.log(gpsLocation)
    bennysLocation = locations.find((location) => {
        // console.log(location.name)
        return isInLocation(location.corners, gpsLocation)
    })
    return bennysLocation
}

const isInLocation = (corners, gpsLocation) => {
    const lats = corners.map((corner) => corner[0])
    const maxLat = Math.max(...lats)
    const minLat = Math.min(...lats)
    const lngs = corners.map((corner) => corner[1])
    const maxLng = Math.max(...lngs)
    const minLng = Math.min(...lngs)
    // console.log('minLat: ' + minLat)
    // console.log('maxLat: ' + maxLat)
    // console.log('minLng: ' + minLng)
    // console.log('maxLng: ' + maxLng)
    // console.log('gpsLat: ' + gpsLocation[0])
    // console.log('gpsLng: ' + gpsLocation[1])
    const isInLat = gpsLocation[0] < maxLat && gpsLocation[0] > minLat
    // console.log(isInLat)
    const isInLng = gpsLocation[1] < maxLng && gpsLocation[1] > minLng
    // console.log(isInLng)
    return (isInLat && isInLng)
}

console.log(whereIsBenny(gpsLocation))
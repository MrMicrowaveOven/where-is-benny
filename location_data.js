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
        image_url: 'https://wheres-benny-store.s3.us-west-1.amazonaws.com/good_friends_bar.webp',
        addresses: [
            '740 Dauphine'
        ]
    },
    {
        name: `Raw Hide`,
        corners: [
            [29.960517437230298, -90.06683270281823],
            [29.960678940136066, -90.06668518132577],
            [29.960605741009847, -90.06656448192282],
            [29.9604506283976, -90.06672005004216],
        ],
        image_url: `https://wheres-benny-store.s3.us-west-1.amazonaws.com/raw_hide.jpeg`,
        addresses: [
            '740 Burgundy'
        ]
    },
    {
        name: `GrandPre's`,
        corners: [
            [29.961837338195433, -90.0670948887413],
            [29.961886137014247, -90.06703386848757],
            [29.961754844899676, -90.06682197398021],
            [29.961688617838014, -90.06685952490557],
        ],
        image_url: `https://wheres-benny-store.s3.us-west-1.amazonaws.com/grand_pres.jpeg`,
        addresses: [
            '834 N Rampart',
            '834 Rampart'
        ]
    },
    {
        name: `Bourbon Pub`,
        corners: [
            [29.95961929034687, -90.06509060807514],
            [29.959773823306207, -90.0649558270752],
            [29.959644271255325, -90.06475734361258],
            [29.959509490467116, -90.06489279516477],
        ],
        image_url: `https://wheres-benny-store.s3.us-west-1.amazonaws.com/burbon_pub.jpg`,
        addresses: [
            '801 Bourbon'
        ]
    },
    {
        name: `Oz`,
        corners: [
            [29.959492565629837, -90.06487299762966],
            [29.95968369871042, -90.06469932460408],
            [29.959596556014898, -90.0645209577136],
            [29.959363594167023, -90.06471206509624],
        ],
        image_url: `https://wheres-benny-store.s3.us-west-1.amazonaws.com/oz.jpg`,
        addresses: [
            '800 Bourbon'
        ]
    },
    {
        name: `American Townhouse`,
        corners: [
            [29.963073439082528, -90.06599708717],
            [29.963165226175516, -90.06590186875215],
            [29.962925882438924, -90.06552032452842],
            [29.962827704864228, -90.06561621349671],
        ],
        image_url: `https://wheres-benny-store.s3.us-west-1.amazonaws.com/american_townhouse.png`,
        addresses: [
            '1012 N Rampart',
            '1012 Rampart'
        ]
    },
    {
        name: `The Phoenix`,
        corners: [
            [29.96767900651459, -90.05664733343484],
            [29.967692367312925, -90.05617995853764],
            [29.967422827381686, -90.05614307816555],
            [29.967381583060472, -90.05661984079384],
        ],
        image_url: `https://wheres-benny-store.s3.us-west-1.amazonaws.com/phoenix.png`,
        addresses: [
            '941 Elysian Fields'
        ]
    },
    {
        name: `Cafe Lafitte's in Exile`,
        corners: [
            [29.96036916733369, -90.06432271819499],
            [29.96049058519145, -90.06421274762786],
            [29.960405766990625, -90.06407997828464],
            [29.960305844085855, -90.06420000713534],
        ],
        image_url: `https://wheres-benny-store.s3.us-west-1.amazonaws.com/cafe_lafitte.jpg`,
        addresses: [
            '901 Bourbon'
        ]
    },
    {
        name: `Crossing`,
        corners: [
            [29.95761937253091, -90.06829908527257],
            [29.957764032240963, -90.06817637421636],
            [29.957639706237785, -90.06796917358044],
            [29.957488074780496, -90.06810529568105],
        ],
        image_url: `https://wheres-benny-store.s3.us-west-1.amazonaws.com/crossing.jpeg`,
        addresses: [
            '439 Dauphine'
        ]
    },
    {
        name: `Corner Pocket`,
        corners: [
            [29.958246810724003, -90.06888112463712],
            [29.958122485324626, -90.06871616879104],
            [29.95791856808473, -90.0688797835324],
            [29.958037665093237, -90.0690735731239],
        ],
        image_url: `https://wheres-benny-store.s3.us-west-1.amazonaws.com/corner_pocket.png`,
        addresses: [
            '940 St Louis',
            '940 St. Louis',
        ]
    },
    {
        name: `Golden Lantern`,
        corners: [
            [29.96280259036187, -90.06065277784498],
            [29.96280259036187, -90.06065277784498],
            [29.962603911138977, -90.06064070790502],
            [29.9626974414659, -90.06078688828894],
        ],
        image_url: `https://wheres-benny-store.s3.us-west-1.amazonaws.com/golden_lantern.jpeg`,
        addresses: [
            '1239 Royal'
        ]
    },
    {
        name: `Home`,
        corners: [
            [29.899786294552253, -90.04100268456881],
            [29.899775831137436, -90.0397621629394],
            [29.898901550792253, -90.03976216294674],
            [29.89898177098344, -90.04090880727362],
        ],
        image_url: ``,
        addresses: [
            '1620 Carol Sue'
        ]
    },
]

// const gpsLocation = [29.959637803569084, -90.0649313356797]

const whereIsBenny = (gpsLocation) => {
    bennysLocation = locations.find((location) => {
        // console.log(location.name)
        return isInLocation(location.corners, gpsLocation)
    })
    return bennysLocation
}

const isInLocation = (corners, gpsLocation) => {
    const [corner1, corner2, corner3, corner4] = corners
    const slope1 = getSlope(corner1, corner2)
    const latAtGPSLng1 = corner1[1] + (corner1[0] - gpsLocation[0])*slope1
    const aboveLine1 = latAtGPSLng1 > gpsLocation[1]
    const slope2 = getSlope(corner2, corner3)
    const latAtGPSLng2 = corner2[1] + (corner2[0] - gpsLocation[0])*slope2
    const aboveLine2 = latAtGPSLng2 > gpsLocation[1]
    const slope3 = getSlope(corner3, corner4)
    const latAtGPSLng3 = corner3[1] + (corner3[0] - gpsLocation[0])*slope3
    const aboveLine3 = latAtGPSLng3 > gpsLocation[1]
    const slope4 = getSlope(corner4, corner1)
    const latAtGPSLng4 = corner4[1] + (corner4[0] - gpsLocation[0])*slope4
    const aboveLine4 = latAtGPSLng4 > gpsLocation[1]
    const above1xor3 = (aboveLine1 && !aboveLine3) || (!aboveLine1 && aboveLine3)
    const above2xor4 = (aboveLine2 && !aboveLine4) || (!aboveLine2 && aboveLine4)
    return (above1xor3 && above2xor4)
}

const getSlope = (point1, point2) => {
    const numerator = point1[0] - point2[0]
    const denominator = point1[1] - point2[1]
    return numerator / denominator
}
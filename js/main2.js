mapboxgl.accessToken =
'pk.eyJ1IjoiZGltZW50aW8iLCJhIjoiY2xhMngzZmEyMDRtdDN2bW93MjYyY2hvbSJ9.lBP2u-C8BEgug7_ye16y2g';
let map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [-100.76265632163927, 40.13155587932227], // starting position [lng, lat]
zoom: 4, // starting zoom
projection: 'albers'
});

map.on('load', () => {
map.addSource('rates', {
    type: 'geojson',
    data: 'assets/us-covid-2020/us-covid-2020-rates.json'
});

map.addLayer({
    'id': 'covid-rate',
    'type': 'fill',
    'source': 'rates',
    'paint': {
        'fill-color': [
            'step',
            ['get', 'rates'],
            '#FFEDA0',   // stop_output_0
            20,          // stop_input_0
            '#FED976',   // stop_output_1
            40,          // stop_input_1
            '#FEB24C',   // stop_output_2
            60,          // stop_input_2
            '#FD8D3C',   // stop_output_3
            80,         // stop_input_3
            '#FC4E2A',   // stop_output_4
            100,         // stop_input_4
            '#E31A1C',   // stop_output_5
            // 500,         // stop_input_5
            // '#BD0026',   // stop_output_6
            // 1000,        // stop_input_6
            // "#800026"    // stop_output_7
        ],
        'fill-outline-color': '#BBBBBB',
        'fill-opacity': 0.7,
    }
});

});


const layers = [
    '0-19',
    '20-39',
    '40-59',
    '60-79',
    '80-99',
    '100+'
];
const colors = [
    '#FFEDA070',
    '#FED97670',
    '#FEB24C70',
    '#FD8D3C70',
    '#FC4E2A70',
    '#E31A1C70'
];

const legend = document.getElementById('legend');
legend.innerHTML = "<b>COVID Rates<br>per thousand residents</b><br>";

const source =
    '<p style="text-align: right; font-size:10pt">Source: <a href="https://data.census.gov/table?g=0100000US$050000&d=ACS+5-Year+Estimates+Data+Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true">ACS</a></p>';

// combine all the html codes.
legend.innerHTML = legend.innerHTML + source;

layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
});

map.on('click', 'covid-rate', (event) => {
    console.log(event.features)
    new mapboxgl.Popup()
        .setLngLat(event.features[0].geometry.coordinates[0][0])
        .setHTML(`<strong>Rate:</strong> ${event.features[0].properties.rates}`)
        .addTo(map);
});

// const grades = [4, 5, 6],
// colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)'],
// radii = [5, 15, 20];

// click on tree to view magnitude in a popup
// map.on('click', 'covid-rate', (event) => {
// new mapboxgl.Popup()
//     .setLngLat(event.features[0].geometry.coordinates)
//     .setHTML(`<strong>Magnitude:</strong> ${event.features[0].properties.mag}`)
//     .addTo(map);
// });

// // create legend object, it will anchor to the div element with the id legend.
// const legend = document.getElementById('legend');

// //set up legend grades and labels
// var labels = ['<strong>Size</strong>'], vbreak;
// //iterate through grades and create a scaled circle and label for each
// for (var i = 0; i < grades.length; i++) {
// vbreak = grades[i];
// // you need to manually adjust the radius of each dot on the legend 
// // in order to make sure the legend can be properly referred to the dot on the map.
// dot_radius = 2 * radii[i];
// labels.push(
//     '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radius +
//     'px; height: ' +
//     dot_radius + 'px; "></i> <span class="dot-label" style="top: ' + dot_radius / 2 + 'px;">' + vbreak +
//     '</span></p>');

// }

// const source =
// '<p style="text-align: right; font-size:10pt">Source: <a href="https://earthquake.usgs.gov/earthquakes/">USGS</a></p>';

// // combine all the html codes.
// legend.innerHTML = labels.join('') + source;
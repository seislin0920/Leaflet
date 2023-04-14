let zoom = 4; // 0 - 18
let center = [37.8, -96]; // 中心點座標（緯度,精度）
let map = L.map('map').setView(center, zoom);

//1圖層
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',// 商用時必須要有版權出處
    zoomControl: true , // 是否秀出 - + 按鈕
}).addTo(map);

//引入geojson
geojson = L.geoJson(statesData).addTo(map);
// {
//     "type": "Feature",
//     "properties": {
//         "name": "Alabama",
//         "density": 94.65
//     },
//     "geometry": ...
//     ...
// }

//依密度設定color
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}
//style 控制
function style1(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '5',
        fillOpacity: 0.7,
    };
}

L.geoJson(statesData, {style: style1}).addTo(map);

// mouseover event listen
//mouseover
function highlightFeature(e) {
    let layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
}
//mouseout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}
//click listener
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
//set listener
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    "style": style1,
    "onEachFeature": onEachFeature
}).addTo(map);

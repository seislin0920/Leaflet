//底圖
//Initialize the map 
//chosen geographical coordinates and a zoom level
let zoom = 7; // 0 - 18
let center = [23.742197, 120.879237]; // 中心點座標（緯度,精度）
let map = L.map('map').setView(center, zoom);

//1圖層
//add a tile layer to add to our map
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',// 商用時必須要有版權出處
    zoomControl: true , // 是否秀出 - + 按鈕
}).addTo(map);

//add something
// let marker = L.marker([25.049492995674367, 121.61888955545967]).addTo(map);
    //註記 bindPopup click 可重複出現
    //marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

let polygon = L.polygon([
        [25.05, 121.62],
        [25.06, 121.62],
        [25.06, 121.63],
        [25.05, 121.63]
    ]).addTo(map);
//註記
// let popup = L.popup()
//    .setLatLng([25.049492995674367, 121.61888955545967])
//    .setContent("I am a standalone popup.")
//    .openOn(map);//非addTo,因openOn可在你再次打開新視窗時自動關閉

//listener function
// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
// }
// //map.on('click', onMapClick);

let popup = L.popup();
function onMapClick1(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString() + ".")
        //toString陣列中的每個元素用逗號串接起來成為一個字串，並回傳該字串
        .openOn(map);
    polygon.bindPopup("<br>I am a polygon.");
}
map.on('click', onMapClick1);

////////// image overlay layer

let imageUrl = './geology.png',
    m1 = [25.635698, 122.150650],
    m2 = [21.760104, 118.923001];
const imageBounds = [m1, m2];
// const imageBounds = L.latLngBounds([
//     [25.635698, 122.150650],
//     [21.760104, 118.923001],
//     ]);

let overlay = [
            L.imageOverlay(imageUrl, imageBounds, {
                            opacity : 0.4,
                            interactive: true, //mouse event 可觸發
                            }),
            L.rectangle(imageBounds, {
            weight: 1,
            color: "black",
            fillColor: "none",
            }),
            ]
const Geology = L.layerGroup(overlay);


/*************************************************************************************************** */
//組合圖層資料
//2 圖層
let nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
});

//build icon
const cityIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1527/1527807.png",

    iconSize: [15, 15], 
    // shadowSize: [50, 64], 
    iconAnchor: [0, 0], 
    // shadowAnchor: [4, 62], 
    popupAnchor: [-0.5, 0], 
  });

const markers = [
    L.marker([24.704868, 121.738884], { icon: cityIcon }).bindPopup("宜蘭"),
    L.marker([25.048007, 121.517073], { icon: cityIcon }).bindPopup("臺北"),
    L.marker([23.480005, 120.449752], { icon: cityIcon }).bindPopup("嘉義"),
    L.marker([22.999651, 120.226627], { icon: cityIcon }).bindPopup("臺南"),
  ];
const cities = L.layerGroup(markers);

//切換圖層:需要先組合圖層資料
const changeLayer = {

    "OpenStreetMap": osm,
};
const overlayMaps = { 
    "Cities":cities, 
    Geology };

L.control.layers(changeLayer, overlayMaps).addTo(map);


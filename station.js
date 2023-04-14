let zoom = 7; // 0 - 18
let center = [23.742197, 120.879237]; // 中心點座標（緯度,精度）
let map = L.map('map').setView(center, zoom);

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 5,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',// 商用時必須要有版權出處
    zoomControl: true , // 是否秀出 - + 按鈕
}).addTo(map);

//顯示click位置
let popup = L.popup();
function onMapClick1(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString() + ".")
        //toString陣列中的每個元素用逗號串接起來成為一個字串，並回傳該字串
        .openOn(map);
}
map.on('click', onMapClick1);

//地質圖
let imageUrl = './geology.png',
    m1 = [25.635698, 122.150650],
    m2 = [21.760104, 118.923001];
const imageBounds = [m1, m2];

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

//切換
const changeLayer = {
    "OpenStreetMap": osm,
};

const overlayMaps = { 
     
    "Geology":Geology, };

L.control.layers(changeLayer, overlayMaps).addTo(map);

//讀取資料
var tmpData = [];
$.ajax({
    url: "/BATS_stalist.txt",
    method: 'Get', //request method
    dataType: 'text', //不設定會自動判斷
    async: false, //async 同步請求
    success: result => {
        // console.log(result);
        let tmp = result.split("\n");
            console.debug(tmp.length);
            
            tmp.forEach(row => {
                if (row != '') {
                    var col = row.trim().split(/\s+/); 
                    //trim 去除字串起始及結尾處的空白字元
                    //  "/  /"正則法
                    // console.log(col);
                    tmpData.push(col);
                    // console.log(tmpData);
                    }});
    },
    
    error: function (jqXHR, textStatus, errorThrown) {
        // console.error(jqXHR, textStatus, errorThrown);
        console.error(jqXHR, textStatus, errorThrown);

    },
});
//取所需資料格式
console.log(tmpData[1]);



//build icon
// const cityIcon = L.icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/1527/1527807.png",

//     iconSize: [15, 15], 
//     // shadowSize: [50, 64], 
//     iconAnchor: [0, 0], 
//     // shadowAnchor: [4, 62], 
//     popupAnchor: [-0.5, 0], 
//   });

//放置marker

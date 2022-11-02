const map = L.map('map').setView([23.973875, 120.982025], 7);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//$(".leaflet-layer:nth-of-type(1) img").css("filter", "grayscale(100%)");

//var url = 'https://www.cwb.gov.tw/Data/js/Observe/OSM/C/STMap.json';
var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-30D0DB30-4D67-4694-9DBC-3A4CA3DE4642&elementName=Weather';

fetch(url, { mode: 'cors'})
	.then((response) => response.json())
	.then((data) => addDataToMap(data));

var weatherListDay = [
	{
		weather: '晴',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/01.svg'
	},
	{
		weather: '多雲',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/04.svg'
	},
	{
		weather: '陰',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/07.svg'
	},
	{
		weather: '多雲有雨',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/08.svg'
	},
	{
		weather: '陰有雨',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/14.svg'
	},
	{
		weather: '陰有雷雨',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/18.svg'
	},
	{
		weather: '晴有靄',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/24.svg'
	},
	{
		weather: '多雲有靄',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/27.svg'
	},
	{
		weather: '陰有靄',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/28.svg'
	}
];

var weatherListNight = [
	{
		weather: '晴',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/01.svg'
	},
	{
		weather: '多雲',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/04.svg'
	},
	{
		weather: '陰',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/07.svg'
	},
	{
		weather: '多雲有雨',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/08.svg'
	},
	{
		weather: '陰有雨',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/14.svg'
	},
	{
		weather: '陰有雷雨',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/18.svg'
	},
	{
		weather: '晴有靄',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/24.svg'
	},
	{
		weather: '多雲有靄',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/27.svg'
	},
	{
		weather: '陰有靄',
		iconURL: 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/28.svg'
	}
];

function addDataToMap(data) {
	console.log(data);
	data.records.location.forEach(function (item) {
		console.log(item);
		console.log(item.weatherElement[0].elementValue);

		var weather;
		const d = new Date();
		let hour = d.getHours();
		console.log(hour);
		if (hour >= 6 && hour < 18) {
			var weather = weatherListDay.filter(obj => {
				return obj.weather === item.weatherElement[0].elementValue
			})
		} else if (hour < 6 || hour >= 18) {
			var weather = weatherListNight.filter(obj => {
				return obj.weather === item.weatherElement[0].elementValue
			})
		}
		console.log(weather);
		if (weather.length > 0) {

			var circleOptions = {
				radius: 18,
				//stroke: false,
				color: '#00569c',
				weight: 1,
				fillColor: 'rgba(255,255,255)',
				fillOpacity: 0.9
			}

			var circle = L.circleMarker([item.lat, item.lon], circleOptions).addTo(map);

			var icon = L.icon({
				iconUrl: weather[0].iconURL,
				iconSize: [25, 29], // size of the icon
				iconAnchor: [12, 15], // point of the icon which will correspond to marker's location
				popupAnchor: [0, -15] // point from which the popup should open relative to the iconAnchor
			});

			var popupContent = item.locationName + "</br>" + item.weatherElement[0].elementValue;

			//var marker = L.marker([item.lat, item.lon]).addTo(map);
			var marker = L.marker([item.lat, item.lon], { icon: icon }).bindPopup(popupContent).addTo(map);

		}
	});

}


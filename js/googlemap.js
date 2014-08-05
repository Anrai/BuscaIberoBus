// http://stackoverflow.com/questions/17474550/solved-refresh-google-map-javascript-ajax
function GoogleMap(){

  this.initialize = function(){
    navigator.geolocation.getCurrentPosition(getPos, onError, {enableHighAccuracy:true});
  }
}

var mylat;
var mylon;

function getPos(position) {//initial function to read the position

  mylat = position.coords.latitude;
  mylon = position.coords.longitude;

  // Obtener datos del servidor
  $.getJSON('http://www.agarti.com.mx/iberobus/localizar.json', function(serverInfo){
    onSuccess(serverInfo);
  });
  setTimeout(keep_alive, 500); //read every 5 seconds
}

function onSuccess(position) {//read map and mark it in the map
    lat = position.ubicacion.latitud;
    lon = position.ubicacion.longitud;

    console.log("Found - LAT: ", lat, "LON: ", lon);

    var mapoptions = {
        zoom: 16,
        center: new google.maps.LatLng(19.0328754, -98.2421974),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapoptions);
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lon),
        map: map,
        icon: 'img/bus.png'
    });
    markerMeInitial = new google.maps.Marker({
        position: new google.maps.LatLng(mylat,mylon),
        map: map
    });
    var ctaLayer = new google.maps.KmlLayer({
        url: 'http://agarti.com.mx/RutaIberoBusNormal.kml'
    });
    ctaLayer.setMap(map);
}

function keep_alive() {//read position and mark it in the map
  $.getJSON('http://www.agarti.com.mx/iberobus/localizar.json', function(serverInfo){
    onRefresh(serverInfo);
  });
  setTimeout(keep_alive, 500); //read every 5 seconds 
}

//refresh only the marker
function onRefresh(position) {
  lat = position.ubicacion.latitud;
  lon = position.ubicacion.longitud;

  console.log("Found - LAT: ", lat, "LON: ", lon);

  marker.setPosition(new google.maps.LatLng(lat, lon));//refresh marker
  //map.setCenter(new google.maps.LatLng(lat, lon));//resfresh center of the map
}

function trace_client() {//mark clients position in the map
   //clientMarker.setPosition(new google.maps.LatLng(client_lat, client_lon));
   clientMarker = new google.maps.Marker({
        position: new google.maps.LatLng(client_lat,client_lon),
        map: map
    });
   console.log("client marked in the map");
}

function onError(error) {
   console.log('code: '    + error.code, 'message: ' + error.message);
}
function GoogleMap(){

    this.initialize = function(){
        var map = showMap();
        addRoutesToMap(map);
        addMarkersToMap(map);
    }

    var showMap = function(){
        var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(19.0328754, -98.2421974),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        return map;
    }
}

var globalServerInfo;

// Obtener datos del servidor
$.getJSON('http://www.agarti.com.mx/iberobus/localizar.json', function(serverInfo){
    globalServerInfo = serverInfo;
});

// Colocar marcadores en el mapa
var addMarkersToMap = function(map){
    var mapBounds = new google.maps.LatLngBounds(); // Para cargar Longitudes y Latitudes0
    
    var latitudeAndLongitudeOne = new google.maps.LatLng('19.0328754', '-98.2421974');

    var markerOne = new google.maps.Marker({
        position: latitudeAndLongitudeOne,
        map: map
    });

    var latitudeAndLongitudeTwo = new google.maps.LatLng(globalServerInfo.ubicacion.latitud, globalServerInfo.ubicacion.longitud);

    var markerOne = new google.maps.Marker({
        position: latitudeAndLongitudeTwo,
        map: map,
        icon: 'img/bus.png'
    });

    mapBounds.extend(latitudeAndLongitudeOne);
    mapBounds.extend(latitudeAndLongitudeTwo);
    
    map.fitBounds(mapBounds);

    keep_alive();
}

// Añadir ruta en el mapa
var addRoutesToMap = function(map){
    var ctaLayer = new google.maps.KmlLayer({
        url: 'http://agarti.com.mx/RutaIberoBusNormal.kml'
    });
    ctaLayer.setMap(map);
}

function keep_alive() {//read position and mark it in the map
    $.getJSON('http://www.agarti.com.mx/iberobus/localizar.json', function(serverInfo){
        globalServerInfo = serverInfo;
    });
   onRefresh();
   setTimeout(keep_alive, 5000); //read every 10 seconds   
}

//refresh only the marker
function onRefresh(map) {

   console.log("Found - LAT: ", globalServerInfo.ubicacion.latitud, "LON: ", globalServerInfo.ubicacion.longitud);

   //markerOne.setPosition(new google.maps.LatLng(globalServerInfo.ubicacion.latitud, globalServerInfo.ubicacion.longitud));//refresh marker
   map.setCenter(new google.maps.LatLng(globalServerInfo.ubicacion.latitud, globalServerInfo.ubicacion.longitud));//resfresh center of the map
}
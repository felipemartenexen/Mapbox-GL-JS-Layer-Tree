mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsaXBlbWFydGVuZXhlbiIsImEiOiJjazNyZGJyZDMwNDdkM21vMnM3eWRwNnhhIn0.VNoLWqjc-gSs16rIcrll8Q';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-54.21181662736086, -13.921226028046888],
    zoom: 3.69090679
});


map.on('load', function() {

    var marker = new mapboxgl.Marker({
        draggable: true
        })
        .setLngLat([0, 0])
        .addTo(map);
         
        function onDragEnd() {
        var lngLat = marker.getLngLat();
        var center2 = [lngLat.lng, lngLat.lat];
        console.log(lngLat.lng)
        console.log(lngLat.lat)
        }
         
        marker.on('dragend', onDragEnd);


    /*
    map.on('click', function(e) {
        // set bbox as 5px reactangle area around clicked point
        var bbox =  e.lngLat
        console.log(bbox)
       
        });
*/
        var points = turf.points([
            [-54.21181662736086, -13.921226028046888],
            [-46.6246, -23.5325],
            [-46.6062, -23.5513],
            [-46.663, -23.554],
            [-46.643, -23.557]
        ]);

  // Create circle with radius
        var center = [-51.21181662736086, -3.921226028046888];
        var radius = 1000;
        var options = {steps: 100, units: 'kilometers', properties: {foo: 'bar'}};
        var circle = turf.circle(center, radius, options);

        // Find point within circle
        
        var markerWithin = turf.pointsWithinPolygon(points, circle);

        console.log("Found: " + markerWithin.features.length + " points");
       


        // Draw circle polygon
        map.addLayer({
            'id': 'circle',
            'type': 'fill',
            'source': {
            'type': 'geojson',
            'data': circle
            },
            'layout': {},
            'paint': {
            'fill-color': '#525252',
            'fill-opacity': 0.2
            }
        });



            // Draw marker with in circle
    markerWithin.features.forEach(function(marker) {
        // Create marker
        var selecionado = new mapboxgl.Marker()
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
        console.log(selecionado)
    });


    map.addSource('car_dealership', { type: 'geojson', data: 'data/car_dealership.geojson',
    cluster: true,
    clusterMaxZoom: 14, 
    clusterRadius: 50 });
    map.addLayer({
        "id": "car_dealership",
        "type": "circle",
        "source": "car_dealership",
        'paint': {
            'circle-radius': 4,
            'circle-color': '#3366ff'
            },
    });

    map.addSource('cbc_store', { type: 'geojson', data: 'data/cbc_store.geojson',
    cluster: true,
    clusterMaxZoom: 14, 
    clusterRadius: 50 });
    map.addLayer({
        "id": "cbc_store",
        "type": "circle",
        "source": "cbc_store",
        'paint': {
            'circle-radius': 4,
            'circle-color': '#cc00cc'
            },
    });
    
    map.addSource('espaco_laser_stores', { type: 'geojson', data: 'data/espaco_laser_stores.geojson',
    cluster: true,
    clusterMaxZoom: 14, 
    clusterRadius: 50 });
    map.addLayer({
        "id": "espaco_laser_stores",
        "type": "circle",
        "source": "espaco_laser_stores",
        'paint': {
            'circle-radius': 4,
            'circle-color': '#ff9966'
            },
    });

    map.addSource('kop_store', { type: 'geojson', data: 'data/kop_store.geojson',
    cluster: true,
    clusterMaxZoom: 14, 
    clusterRadius: 50 });
    map.addLayer({
        "id": "kop_store",
        "type": "circle",
        "source": "kop_store",
        'paint': {
            'circle-radius': 4,
            'circle-color': '#cc9900'
            },
    });

    map.addSource('list_schools', { type: 'geojson', data: 'data/list_shools.geojson',
    cluster: true,
    clusterMaxZoom: 14, 
    clusterRadius: 50 });
    map.addLayer({
        "id": "list_schools",
        "type": "circle",
        "source": "list_schools",
        'paint': {
            'circle-radius': 4,
            'circle-color': '#99ff66'
            },
    });

    map.addSource('media', { type: 'geojson', data: 'data/media.geojson',
    cluster: true,
    clusterMaxZoom: 14, 
    clusterRadius: 50 });
    map.addLayer({
        "id": "media",
        "type": "circle",
        "source": "media",
        'paint': {
            'circle-radius': 4,
            'circle-color': '#003300'
            },
    });


    map.addSource('piticas_stores', { type: 'geojson', data: 'data/piticas_stores.geojson',
    cluster: true,
    clusterMaxZoom: 14, 
    clusterRadius: 50 });
    map.addLayer({
        "id": "piticas_stores",
        "type": "circle",
        "source": "piticas_stores",
        'paint': {
            'circle-radius': 4,
            'circle-color': '#00cc99'
            },
    });


    map.addSource('toyota_stores', { type: 'geojson', data: 'data/toyota_stores.geojson',
    cluster: true,
    clusterMaxZoom: 14, 
    clusterRadius: 50});
    map.addLayer({
        "id": "toyota_stores",
        "type": "circle",
        "source": "toyota_stores",
        'paint': {
            'circle-radius': 4,
            'circle-color': '#003366'
            },    
    });
    //////cluster

/*
        map.addLayer({
            id: 'clusters_car_dealership',
            type: 'circle',
            source: 'car_dealership',
            filter: ['has', 'point_count'],
            paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
            ],
            'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
            ]
            }
            });

            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'car_dealership',
                filter: ['has', 'point_count'],
                layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
                }
                });
*/        
/*
    map.setFilter('port', ['<', 'natlscale', 6]);

    map.addSource('airports', { type: 'geojson', data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson' });
    map.addLayer({
        "id": "airport",
        "type": "symbol",
        "source": "airports",
        "layout": {
            "icon-image": "airport-11"
        },
        "paint": {
            "icon-color": '#0dd224',
            "icon-halo-color": "#0dd224"
        }
    });
    */
})


var layers =
    [{
        'name': 'Car Dealership',
        'id': 'car_dealership',
        'source': 'car_dealership',
        'directory': 'Categoria I',
    }, {
        'name': 'CBC Store',
        'id': 'cbc_store',
        'source': 'cbc_store',
        'directory': 'Categoria I',
    }, {
        'name': 'Espaço Laser Stores',
        'id': 'espaco_laser_stores',
        'source': 'espaco_laser_stores',
        'directory': 'Categoria I',
    }, {
        'name': 'KOP Store',
        'id': 'kop_store',
        'source': 'kop_store',
        'directory': 'Categoria I',
    }, {
        'name': 'List Schools',
        'id': 'list_schools',
        'source': 'list_schools',
        'directory': 'Categoria I',
    }, {
        'name': 'Media',
        'id': 'media',
        'source': 'media',
        'directory': 'Categoria II',
    }, {
        'name': 'Piticas Stores',
        'id': 'piticas_stores',
        'source': 'piticas_stores',
        'directory': 'Categoria II',
    }, {
        'name': 'Toyota Stores',
        'id': 'toyota_stores',
        'source': 'toyota_stores',
        'directory': 'Categoria II',
    } 
    
];

//var directoryOptions = [{ 'name': 'Categoria I', 'open': false }]
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new LayerTree({
    layers: layers,
    //directoryOptions: directoryOptions
}), 'bottom-left');

////////Raio Circulo


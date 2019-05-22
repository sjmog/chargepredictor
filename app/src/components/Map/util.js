import turf from '@turf/turf';

export function generateRandomPoints(polygon, n) {
    let points = [];

    let bounds = polygon.getBounds(); 
    let x_min  = bounds.getEast();
    let x_max  = bounds.getWest();
    let y_min  = bounds.getSouth();
    let y_max  = bounds.getNorth();

    for (let i = 0; points.length < 100; i++) {
        let lat = y_min + (Math.random() * (y_max - y_min));
        let lng = x_min + (Math.random() * (x_max - x_min));

        if (isInside(polygon, lat, lng)) points.push([lng, lat]);
    }
}

export function isInside(polygon, lat, lng) {
    let point = turf.point([lng, lat]);
    let poly = polygon.toGeoJSON();
    return turf.inside(point, poly);
}
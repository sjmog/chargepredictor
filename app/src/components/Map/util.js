import turf, { point } from '@turf/turf';
import booleanInside from '@turf/boolean-point-in-polygon';
import L from 'leaflet'

export function generateRandomPoints(polygon, n = 100) {
    let points = [];

    let poly = L.polygon(polygon.map(x => [ x[1], x[0] ]));

    let bounds = poly.getBounds();
    let x_min  = bounds.getEast();
    let x_max  = bounds.getWest();
    let y_min  = bounds.getSouth();
    let y_max  = bounds.getNorth();

    for (let i = 0; points.length < n; i++) {
        let lat = y_min + (Math.random() * (y_max - y_min));
        let lng = x_min + (Math.random() * (x_max - x_min));

        if (isInside(poly, lat, lng)) points.push([lng, lat]);
    }

    return points;
}

export function boundingBoxOfPolygon(polygon) {
    let poly = L.polygon(polygon.map(x => [ x[1], x[0] ]));
    return poly.getBounds();
}

export function isInside(polygon, lat, lng) {
    let pnt = point([lng, lat]);
    let poly = polygon.toGeoJSON();
    return booleanInside(pnt, poly);
}
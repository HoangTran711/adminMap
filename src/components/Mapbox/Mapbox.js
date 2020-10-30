import React, { useContext, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import MyContext from '../../context/MyContext';

mapboxgl.accessToken =
  'pk.eyJ1IjoidHJhbmhvYW5nMDcxMTIwIiwiYSI6ImNrZjFocDZzYzEzc2gycW9jZXkwMGlmZmcifQ.MPYuezjAocZaq6v4nvOEwA';
function Mapbox() {
  const data = useContext(MyContext);

  var mapWrapper = useRef(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapWrapper,
      style: 'mapbox://styles/tranhoang071120/ckf2xr6kl05o21asu1omijgo9',
      center: [106.77, 10.851],
      zoom: 16.5,
    });

    data.geoLoc.features.map((a, index) => {
      var html =
        "<div class='popup__container'>" +
        "<img src='https://picsum.photos/200/300' class='popup__image' /> " +
        `<h2 className='popup__heading'>${a.properties.name} </h2>` +
        `<p class='popup__text'>${a.properties.description}</p>` +
        '</div>';
      var customPopUp = new mapboxgl.Popup({
        anchor: 'bottom', // To show popup on top
        offset: { bottom: [0, -10] }, // To prevent popup from over shadowing the marker.
        closeOnClick: false, // To prevent close on mapClick.
      }).setHTML(html); // You can set any valid HTML.
      var el = document.createElement('div');
      let t = document.createElement('p');
      let b = document.createElement('i');
      b.className = 'fas fa-map-marker';
      b.id = a.properties.id;
      t.innerHTML = a.properties.name;
      el.className = 'marker';
      el.id = a.properties.name;
      el.appendChild(b);
      el.appendChild(t);
      const marker = new mapboxgl.Marker(el)
        .setLngLat(a.geometry.coordinates)
        .setPopup(customPopUp) // sets a popup on this marker
        .addTo(map);
      const markerDiv = marker.getElement();
      markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
      markerDiv.addEventListener('mouseleave', () => customPopUp.remove());
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/walking',
    });
    data.geoLoc.features.map((a) => {
      let clickSearch = () => {
        data._setId(a._id);
        document.querySelector('.back-ground__overlay').style.opacity = 1;
        document.querySelector('.back-ground__overlay').style.visibility =
          'visible';
        document.querySelector('.overlay').style.opacity = 1;
        document.querySelector('.overlay').style.visibility = 'visible';
        directions.actions.clearOrigin();
        if (data.prevIdStart.length === 0) {
          document.getElementById(a.properties.id).style.animation =
            'click .5s infinite';
          document.getElementById(a.properties.id).style.color = 'red';
          let temp = data.prevIdStart;
          temp.push(a.properties.id);
          data.setPrevIdStart(temp);
        } else {
          document.getElementById(
            data.prevIdStart[data.prevIdStart.length - 1]
          ).style.animation = 'none';
          document.getElementById(
            data.prevIdStart[data.prevIdStart.length - 1]
          ).style.color = 'inherit';
          document.getElementById(a.properties.id).style.animation =
            'click .5s infinite';
          document.getElementById(a.properties.id).style.color = 'red';
          let temp = data.prevIdStart;
          temp.push(a.properties.id);
          data.setPrevIdStart(temp);
        }
      };
      if (document.getElementById(a.properties.name)) {
        document
          .getElementById(a.properties.name)
          .addEventListener('click', clickSearch);
      }
    });
    data.setDirection(directions);
    // directions.actions.setOriginFromCoordinates([106.771973, 10.851025]);
    // directions.actions.setDestinationFromCoordinates([106.770524, 10.851386]);

    map.on('load', () => {
      var layers = map.getStyle().layers;
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      map.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId
      );
    });

    map.addControl(directions, 'top-right');
  }, []);
  return (
    <React.Fragment>
      <div ref={(el) => (mapWrapper = el)} className="mapWrapper" />
    </React.Fragment>
  );
}

export default Mapbox;

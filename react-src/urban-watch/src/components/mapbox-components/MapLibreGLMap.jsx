import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { defaultCenterPositionOnMapLngLat } from '../../data/AppData'
import { GetUserPositionOnMap } from '../../utils/GetUserGeoLocation'
import { renderComponentToElement } from '../../utils/MapLibreUtils'
import UserPositionMarker from './icons/UserPositionMarker'
import PropTypes from 'prop-types'
import BusIcon from './icons/BusIcon'

const tileStyles = {
  MapMD_2D:
    'https://map.md/api/tiles/styles/map/style.json?v=2018-12-28T00:00:00.000Z',
  MapMD_3D:
    'https://map.md/api/tiles/styles/satelite/style.json?v=2018-12-28T00:00:00.000Z',
  CARTO_Voyager: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: [
          'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        ],
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'osm-tiles',
        type: 'raster',
        source: 'osm',
        minzoom: 0,
        maxzoom: 19,
      },
    ],
  },
}

MapLibreGLMap.propTypes = {
  vehicles: PropTypes.array,
}
function MapLibreGLMap({ vehicles }) {
  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)
  const vehiclesMarkerRef = useRef(vehicles)
  const userPositionMarkerRef = useRef(null)
  const [mapCenter, setMapCenter] = useState(defaultCenterPositionOnMapLngLat)

  useEffect(() => {
    const getLocation = async () => {
      try {
        const result = await GetUserPositionOnMap()
        if (mapCenter[0] !== result[0] || mapCenter[1] !== result[1]) {
          setMapCenter(result)
        }
      } catch (error) {
        console.error('Error fetching geolocation:', error)
      }
    }

    getLocation()
  }, [])

  useEffect(() => {
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: tileStyles.MapMD_2D,
      center: mapCenter,
      zoom: 14,
      maxZoom: 19,
      attributionControl: false,
    })

    mapRef.current.addControl(
      new maplibregl.AttributionControl({
        customAttribution: '&copy; <a href="/" target="_blank">UrbanWatch</a>',
        compact: true,
      })
    )

    return () => {
      if (mapRef.current) mapRef.current.remove()
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    mapRef.current.on('load', () => {
      mapRef.current.setCenter(mapCenter)
      if (userPositionMarkerRef.current) {
        userPositionMarkerRef.current.remove()
      }

      const markerElement = renderComponentToElement(<UserPositionMarker />)

      userPositionMarkerRef.current = new maplibregl.Marker({
        element: markerElement,
        draggable: false,
      })
        .setLngLat(mapCenter)
        .addTo(mapRef.current)
    })
  }, [mapCenter])

  useEffect(() => {
    if (!mapRef.current) return
    if (vehicles.length === 0) return

    const updateVehicles = () => {
      if (!mapRef.current || !mapRef.current.getStyle()) return

      const geojsonData = {
        type: 'FeatureCollection',
        features: vehicles.map((vehicle) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [vehicle.longitude, vehicle.latitude],
          },
          properties: {
            id: vehicle.id,
            name: vehicle.speed || 'Unknown Vehicle', // Add any other vehicle details here
            info: vehicle.label || 'No additional information available.',
          },
        })),
      }

      if (mapRef.current.getLayer && mapRef.current.getLayer('vehicle-layer')) {
        mapRef.current.getSource('vehicles').setData(geojsonData)
      } else {
        mapRef.current.addSource('vehicles', {
          type: 'geojson',
          data: geojsonData,
        })

        mapRef.current.addLayer({
          id: 'vehicle-layer',
          type: 'circle',
          source: 'vehicles',
          paint: {
            'circle-radius': 8,
            'circle-color': '#FF0000',
          },
        })
      }
    }

    if (mapRef.current.isStyleLoaded()) {
      updateVehicles()
    } else {
      mapRef.current.once('style.load', () => {
        console.log('Map style loaded!')
        updateVehicles()
      })
    }

    console.log(mapRef.current)
    console.log(vehicles)
    return () => {
      if (
        mapRef.current &&
        mapRef.current.getLayer &&
        mapRef.current.getLayer('vehicle-layer')
      ) {
        mapRef.current.removeLayer('vehicle-layer')
        mapRef.current.removeSource('vehicles')
      }
    }
  }, [vehicles])

  return (
    <div id="map-root" className="absolute inset-0">
      <div
        id="map-container"
        ref={mapContainerRef}
        className="h-full w-full bg-gray-300"
      />
    </div>
  )
}

export default MapLibreGLMap

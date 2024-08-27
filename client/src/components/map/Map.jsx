import './map.scss'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Pin from '../pin/Pin'
import L from 'leaflet';


L.Icon.Default.mergeOptions({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

function Map({ items }) {
  return (
    <MapContainer center={
      items.length === 1 ? [items[0].latitude, items[0].longitude] : [49.2827, -123.1207]
    } zoom={12} scrollWheelZoom={false} className='map'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map(item => (
        <Pin item={item} key={item.id} />
      ))}

    </MapContainer>
  )
}

export default Map
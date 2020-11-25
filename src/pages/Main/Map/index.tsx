import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { Container } from './styles';

interface IMapProps {
  position: [number, number];
}

const Map: React.FC<IMapProps> = ({ position }) => {
  return (
    <Container>
      <h1>
        <FiMapPin /> Location
      </h1>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 200 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};

export default Map;

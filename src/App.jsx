import React from 'react'
import { useEffect,useState } from 'react'
import {io} from 'socket.io-client'
import {MapContainer,TileLayer,Marker,Popup,useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


import L from 'leaflet';

// Leaflet ke default broken icon paths ko theek karne ke liye code
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


// Backend server se connect kiya. Jaise hi ye line chalti hai, 
// Socket.io piche se apne aap backend par "connection" event bhej deta hai!
const socket = io("https://track-my-order-backend.onrender.com")

const App = () => {
const [position, setPosition] = useState([28.6139, 77.2090]);
// Yeh state ek object {} hogi, jisme hum saare connected users ki live location save karenge
const [allUsers, setAllUsers] = useState({});
useEffect(() => {
  let watchId = null;

  // ⭐ FIX 1: Location maangne ka kaam sabse pehle (Socket connection se BAHAAR)
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        
        // Agar socket connected hai, toh live location bhejte raho
        if (socket.connected) {
          socket.emit('send-location', { latitude, longitude });
        }
      },
      (error) => {
        console.log("location Error", error);
        // Doston ko pata chal sake isliye alert
        if (error.code === 1) {
          alert("Bhai, setting se ya address bar ke lock icon se location permission ALLOW karo! 📍");
        } else {
          alert("Phone ka GPS ya Location settings check karo! 🛰️");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // Thoda badha diya taaki slow phones par timeout na ho
        maximumAge: 0
      }
    );
  } else {
    alert("Bhai tumhara browser location support nahi karta, Chrome use karo!");
  }

  // ⭐ FIX 2: Socket jab bhi connect ho, apni maujuda location turant ek baar bhej de
  socket.on('connect', () => {
    console.log("Connected to server! ID:", socket.id);
    // State se current position utha kar turant bhej di
    if (position) {
      socket.emit('send-location', { latitude: position[0], longitude: position[1] });
    }
  });

  // Data Sunna
  socket.on('receive-location', function (data) {
    const { id, latitude, longitude } = data;
    setAllUsers((prev) => ({ ...prev, [id]: [latitude, longitude] }));
  });

  socket.on("user-disconnected", (id) => {
    setAllUsers((prev) => {
      const updatedUsers = { ...prev };
      delete updatedUsers[id];
      return updatedUsers;
    });
  });

  // Cleanup function
  return () => {
    if (watchId) navigator.geolocation.clearWatch(watchId);
    socket.off("connect");
    socket.off("receive-location");
    socket.off("user-disconnected");
  };
}, []); // position array empty hi rahega

  // 🎥 Yeh component map ke camera ko naye coordinates par move karega
const RecenterMap = ({ position }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.setView(position, 15); // camera ko position par set karega zoom level 15 ke sath
    }
  }, [position, map]); // Jab bhi position badlegi, ye chalega

  return null; // Yeh kuch render nahi karta, bas piche se camera ghumata hai
};


  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <h2 style={{ textAlign: 'center', position: 'absolute', zIndex: 1000, width: '100%', background: 'white', margin: 0, padding: '10px' }}>
         TrackMyOrder - Live Tracker
      </h2>
      <MapContainer style={{height:"100%",width:"100%"}} center={position} zoom={15}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
        <RecenterMap position={position} />
        {Object.keys(allUsers).map((id)=>(
          <Marker key={id} position={allUsers[id]} >
          <Popup>
  {id === socket.id ? "Tum abhi yahan ho! 📍" : `Naya Banda (ID: ${id})`}
</Popup>
        </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default App

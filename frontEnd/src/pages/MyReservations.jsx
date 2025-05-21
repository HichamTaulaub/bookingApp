// import { useEffect, useState } from "react";
// import axios from "axios";

// const MyReservations = () => {
//   const [reservations, setReservations] = useState([]);
//   const userId = /* get from auth context or localStorage */;
  
//   useEffect(() => {
//     const fetchReservations = async () => {
//       const res = await axios.get(`http://localhost:8800/api/reservations/${userId}`);
//       setReservations(res.data);
//     };
//     fetchReservations();
//   }, [userId]);

//   const handleCancel = async (id) => {
//     await axios.delete(`http://localhost:8800/api/reservations/${id}`);
//     setReservations(reservations.filter(res => res._id !== id));
//   };

//   return (
//     <div>
//       <h2>My Reservations</h2>
//       {reservations.map(res => (
//         <div key={res._id} className="reservation-card">
//           <p><strong>Hotel:</strong> {res.hotelId?.name}</p>
//           <p><strong>Rooms:</strong> {res.roomIds.map(r => r.number).join(", ")}</p>
//           <p><strong>Dates:</strong> {res.dates.map(d => new Date(d).toLocaleDateString()).join(" to ")}</p>
//           <button onClick={() => handleCancel(res._id)}>Cancel Reservation</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyReservations;

// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext"; // adjust path as needed

// const MyReservations = () => {
//   const { user } = useContext(AuthContext);
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     const fetchReservations = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8800/api/reservations/${user._id}`);
//         setReservations(res.data);
//       } catch (err) {
//         console.error("Error fetching reservations:", err);
//       }
//     };

//     if (user && user._id) {
//       fetchReservations();
//     }
//   }, [user]);

//   const handleCancel = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8800/api/reservations/${id}`);
//       setReservations(reservations.filter((res) => res._id !== id));
//     } catch (err) {
//       console.error("Cancellation error:", err);
//     }
//   };

//   return (
//     <div>
//       <h2>My Reservations</h2>
//       {reservations.map((res) => (
//         <div key={res._id} className="reservation-card">
//           <p><strong>Hotel:</strong> {res.hotelId?.name}</p>
//           <p><strong>Rooms:</strong> {res.roomIds.map(r => r.number).join(", ")}</p>
//           <p><strong>Dates:</strong> {res.dates.map(d => new Date(d).toLocaleDateString()).join(" to ")}</p>
//           <button onClick={() => handleCancel(res._id)}>Cancel Reservation</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyReservations;

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import Navbar from "../components/navbar/Navbar"; // Adjust the import path as needed
import './myreserv.css'

const MyReservations = () => {
  const { user } = useContext(AuthContext);

  // Use useFetch to get the reservations
  const { data: reservations, loading, error, reFetch } = useFetch(
    user ? `http://localhost:8800/api/reservations/${user._id}` : null
  );

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/reservations/${id}`);
      reFetch();
    } catch (err) {
      console.error("Cancellation error:", err);
    }
  };

  if (!user) return (
    <div>
      <Navbar />
      <p>Please log in to see your reservations.</p>
    </div>
  );

  return (
    <div>
      <Navbar /> {/* Add Navbar here */}
      
      <div className="reservations-container">
        <h2>My Reservations</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error loading reservations.</p>}
        {reservations?.length === 0 && !loading ? (
          <p>You have no reservations.</p>
        ) : (
          reservations?.map((res) => ( 
            <div key={res._id} className="reservation-card">
              <p><strong>Hotel:</strong> {res.hotelId?.name}</p>
              <p><strong>Rooms:</strong> {res.roomNumbers?.map((r) => r).join(", ")}</p>
              
              <p>
                <strong>Dates:</strong>{" "}
                {res.dates?.map((d) => new Date(d).toLocaleDateString()).join(" to ")}
              </p>
              <button className="cancel" onClick={() => handleCancel(res._id)}>Cancel Reservation</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyReservations;
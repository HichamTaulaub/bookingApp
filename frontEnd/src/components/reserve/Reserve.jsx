// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// import './reserve.css'
// import useFetch from "../../hooks/useFetch";
// import { useContext, useState } from "react";
// import { SearchContext } from "../../context/SearchContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Reserve = ({setOpen, hotelId}) => {
//   const [selectedRooms, setSelectedRooms] = useState([])
//   const {data, loading, error} = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`);
//   const {dates} = useContext(SearchContext)

//   const getDatesInRange = (startDate, endDate) => {
//   const start = new Date(startDate)
//   const end = new Date(endDate)
//   const date = new Date(start.getTime());
//   let list = []
//   while (date <= end){
//     list.push(new Date(date).getTime())
//     date.setDate(date.getDate()+1)
//   }
//   return list
//   }
// const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

// const isAvailable = (roomNumber) => {
//     const isFound = roomNumber.unvailableDates.some((date)=> alldates.includes(new Date(date).getTime())
// );
// return !isFound
// }

//   const handleSelect = (e)=>{
//   const checked = e.target.checked 
//   const value = e.target.value
//   setSelectedRooms(
//     checked
//     ?[...selectedRooms, value]
//     : selectedRooms.filter((item) => item !== value)
//   )
//   }

//   const navigate = useNavigate();
//   const handleClick = async () => {
//     try {
//       await Promise.all(
//         selectedRooms.map((roomId) => {
//           const res = axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, {
//             dates: alldates,
//           });
//           return res.data;
//         })
//       );
//       setOpen(false);
//       navigate("/payment");
//     } catch (err) {}
//   };
//   return (
//     <div className="reserve">

//      <div className="rContainer">
//         <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=> setOpen(false)}/>
//          <span>Select your rooms</span>
//          {data.map(item=>(
//             <div className="rItem">
//                 <div className="rItemIfo">
//                   <div className="rTitle">{item.title}</div>
//                   <div className="rDesc">{item.desc} </div>
//                   <div className="rMax">Max people: <b>{item.maxPeople}</b> </div>
//                   <div className="rPrice">{item.price} </div>
//                     {item.roomNumbers.map(roomNumber=>(
//                   <div className="room">
//                         <label>{roomNumber.number} </label>
//                         <input type="checkbox" 
//                         value={roomNumber._id} 
//                         onChange={handleSelect}
//                         disabled={!isAvailable(roomNumber)} 
//                          />
//                   </div>
//                     ))}
//                 </div>
//             </div>
//          ))}
//          <button onClick={handleClick} className="rButton">Reserve now</button>
//      </div>
//     </div>
//   )
// }

// export default Reserve

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// import './reserve.css';
// import useFetch from "../../hooks/useFetch";
// import { useContext, useState } from "react";
// import { SearchContext } from "../../context/SearchContext";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Reserve = ({ setOpen, hotelId }) => {
//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const { data } = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`);
//   const { dates } = useContext(SearchContext);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const getDatesInRange = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const date = new Date(start.getTime());
//     const list = [];
//     while (date <= end) {
//       list.push(new Date(date).getTime());
//       date.setDate(date.getDate() + 1);
//     }
//     return list;
//   };

//   const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

//   const isAvailable = (roomNumber) => {
//     const isFound = roomNumber.unavailableDates?.some(date =>
//       alldates.includes(new Date(date).getTime())
//     );
//     return !isFound;
//   };

//   const handleSelect = (e) => {
//     const checked = e.target.checked;
//     const value = e.target.value;
//     setSelectedRooms(
//       checked
//         ? [...selectedRooms, value]
//         : selectedRooms.filter((item) => item !== value)
//     );
//   };

//   const handleClick = async () => {
//     try {
//       // Step 1: Update room availability
//       await Promise.all(
//         selectedRooms.map((roomId) =>
//           axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, {
//             dates: alldates,
//           })
//         )
//       );

//       // Step 2: Create reservation
//       await axios.post("http://localhost:8800/api/reservations", {
//         userId: user._id,
//         hotelId,
//         roomIds: selectedRooms,
//         dates: alldates,
//       });

//       // Step 3: Close modal and redirect to "My Reservations"
//       setOpen(false);
//       navigate("/my-reservations");
//     } catch (err) {
//       console.error("Reservation error:", err);
//     }
//   };

//   return (
//     <div className="reserve">
//       <div className="rContainer">
//         <FontAwesomeIcon
//           icon={faCircleXmark}
//           className="rClose"
//           onClick={() => setOpen(false)}
//         />
//         <span>Select your rooms</span>
//         {data.map((item) => (
//           <div className="rItem" key={item._id}>
//             <div className="rItemInfo">
//               <div className="rTitle">{item.title}</div>
//               <div className="rDesc">{item.desc}</div>
//               <div className="rMax">
//                 Max people: <b>{item.maxPeople}</b>
//               </div>
//               <div className="rPrice">${item.price}</div>
//               {item.roomNumbers.map((roomNumber) => (
//                 <div className="room" key={roomNumber._id}>
//                   <label>{roomNumber.number}</label>
//                   <input
//                     type="checkbox"
//                     value={roomNumber._id}
//                     onChange={handleSelect}
//                     disabled={!isAvailable(roomNumber)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//         <button onClick={handleClick} className="rButton">
//           Reserve now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Reserve;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(date.getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    return !roomNumber.unvailableDates?.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const roomData = JSON.parse(e.target.value); // { id, number }

    setSelectedRooms((prev) =>
      checked
        ? [...prev, roomData]
        : prev.filter((room) => room.id !== roomData.id)
    );
  };

  const handleClick = async () => {
    try {
      // Update room availability
      await Promise.all(
        selectedRooms.map((room) =>
          axios.put(`http://localhost:8800/api/rooms/availability/${room.id}`, {
            dates: alldates,
          })
        )
      );

      // Extract ids and numbers for the reservation
      const roomIds = selectedRooms.map((room) => room.id);
      const roomNumbers = selectedRooms.map((room) => room.number);

      // Create reservation
      await axios.post("http://localhost:8800/api/reservations", {
        userId: user._id,
        hotelId,
        roomIds,
        roomNumbers,
        dates: alldates,
      });

      setOpen(false);
      navigate("/payment");
    } catch (err) {
      console.error("Reservation error:", err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemIfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={JSON.stringify({ id: roomNumber._id, number: roomNumber.number })}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve now
        </button>
      </div>
    </div>
  );
};

export default Reserve;



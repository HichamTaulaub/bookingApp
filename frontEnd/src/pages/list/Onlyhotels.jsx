import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import CityPropr from "../../components/searchItem/CityPropr";

const Onlyhotels = () => {
  const location = useLocation();
  console.log(location.pathname.split('/')[1])
 


  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/${location.pathname.split('/')[1]}`
  );

 

  return (
    <div>
      <Navbar />

          <div className="listResult">
            {loading ? "loading" : <>
            {data.map(item=>(
            <CityPropr item={item} key={item._id}/>
          ))}
            </>}

          </div>
        </div>

  );
};

export default Onlyhotels;
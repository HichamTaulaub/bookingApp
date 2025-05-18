import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {

const {data,loading,error} = useFetch("http://localhost:8800/api/hotels/countByCity?cities=agadir,paris,london")
const navigate = useNavigate()
const handleClick1 = ()=> {
  navigate("/agadir")
}
const handleClick2 = ()=> {
  navigate("/paris")
}
const handleClick3 = ()=> {
  navigate("/london")
}

  return (
    <div className="featured">
     {loading ? ("loadin please wait"

     ) : (
      <> <div onClick={handleClick1} className="featuredItem">
        <img
          src="https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt8ac05715ead44e15/67ae1819d15087a5565276e4/iStock-843510762-HEADERMOBILE.jpg?format=webp&auto=avif&quality=60&crop=1%3A1&width=1440"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Agadir</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      
      <div onClick={handleClick2} className="featuredItem">
        <img
          src="https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/1e/d7.jpg"
          alt=""
          className="featuredImg"
        />
        <div  className="featuredTitles">
          <h1>Paris</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div onClick={handleClick3} className="featuredItem">
        <img
          src="https://chillingwithlucas.com/wp-content/uploads/2022/08/Christmas-Gift-Ideas-49.png"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>London</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default Featured;

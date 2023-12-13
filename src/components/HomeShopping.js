import axios from "axios";
import { useEffect, useState } from "react";
import Item from "./Item";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const HomeShopping = () => {
  const [dataPhone, setDataPhone] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 9; // Number of items to display per page
  const style = [
    { top: "-6em" },
    {
      bottom: "270px",
    },
  ];
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get("/api/v1/products/getAll");
        let data = res && res.data ? res.data : [];
        setDataPhone(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const displayedItems = dataPhone.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section>
      <div className="container-xl py-2" style={{ width: "92%" }}>
        <div className="row">
          {displayedItems.map((item, index) => (
            <div className="col-md-4 mb-5" key={index}>
              <Item children={item} style={style} />
            </div>
          ))}
        </div>
        <div className="row" style={{ display: "flex", marginBottom: 2 }}>
          <Button
            variant="outlined"
            sx={{ color: "black", backgroundColor: "white" }}
            onClick={() => history.push("/Shopping")}
          >
            Xem tất cả ....
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeShopping;

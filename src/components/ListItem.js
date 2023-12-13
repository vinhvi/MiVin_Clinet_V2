import axios from "axios";
import { useEffect, useState } from "react";
import Item from "./Item";
import "../styles/ListItem.scss"; // Import CSS

const ListItem = () => {
  const [dataPhone, setDataPhone] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // Number of items to display per page

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < dataPhone.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    axios
      .get("/api/v1/products/getSPNB")
      .then(function (response) {
        setDataPhone(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div
        className="container-fluid py-2 list-container"
        style={{ width: "92%", height: "430px" }}
      >
        {/* Thêm class list-container */}
        <div className="btn-left">
          <button
            className="btn  btn-previous"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <span>&#60;</span>
          </button>
        </div>
        <div className="btn-right">
          <button
            className="btn  btn-next"
            onClick={handleNext}
            disabled={currentIndex >= dataPhone.length - itemsPerPage}
          >
            <span>&#62;</span>
          </button>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="row align-items-center">
              {dataPhone !== "" ? (
                dataPhone
                  .slice(currentIndex, currentIndex + itemsPerPage)
                  .map((item, index) => (
                    <div className="col-3 mb-5" key={index}>
                      <Item children={item} />
                    </div>
                  ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListItem;

import { useState, useEffect } from "react";
import "../styles/IntroItem.scss";

import axios from "axios";
import { Box, Button, Stack } from "@mui/material";

const IntroItem = (props) => {
  const [value, setValue] = useState("");
  const [heightBox, setHeight] = useState(true);
  const [spec, setSpec] = useState([]);

  useEffect(() => {
    if (props.data) {
      axios
        .get(`/api/v1/products/getById/${props.data}`)
        .then(function (response) {
          setValue(response.data.description);
          setSpec(
            response.data.specifications.filter(
              (item) => item.specificationValue !== ""
            )
          );
          console.log(response.data.specifications);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [props.data]);

  const handleHeight = () => {
    setHeight(!heightBox);
    console.log(heightBox);
  };

  return (
    <div className="container-fluid p-3 bg-light rounded ">
      <Box>
        <Stack
          direction={"row"}
          gap={5}
          sx={{
            justifyContent: "space-between",
            height: heightBox ? 200 : "100%",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              flex: 1,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              padding: 2,
              borderRadius: 5,
            }}
          >
            <h4
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              Đặc điểm nổi bật
            </h4>
            <div
              style={{
                flex: 1,
                backgroundColor: "white",
                height: heightBox ? 100 : "98%",
                overflow: "hidden",
              }}
              dangerouslySetInnerHTML={{ __html: value }}
            ></div>
          </Box>
          <Box
            sx={{
              width: 450,
              backgroundColor: "white",
              borderRadius: 5,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              overflow: "hidden",
              height: heightBox ? 200 : "100%",
            }}
          >
            <h4
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              Thông số kỹ thuật
            </h4>
            <div
              style={{ overflow: "hidden", height: heightBox ? 100 : "100%" }}
            >
              <table className="table">
                <tbody>
                  {spec.map((item, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          width: 200,
                          backgroundColor:
                            index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                        }}
                      >
                        {item.specificationName}:
                      </td>
                      <td
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                        }}
                      >
                        {item.specificationValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Box>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <Button
            variant="outlined"
            onClick={handleHeight}
            sx={{
              width: 400,
              borderRadius: 5,
              backgroundColor: "#146C94",
              color: "white",
              fontSize: 20,
              ":hover": {
                color: "black",
              },
            }}
          >
            {heightBox ? "Xem chi tiết" : "Thu gọn"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};
export default IntroItem;

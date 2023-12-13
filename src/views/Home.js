import React, { useState } from "react";

import ListItem from "../components/ListItem";

import HomeShopping from "../components/HomeShopping";
import Slider from "../components/Slider";
import Menu from "../components/Menu";
import HoverMenu from "../components/HoverMenu";

const Home = () => {
  const [hovered, setHovered] = useState(false);
  const [data, setData] = useState("");
  return (
    <div className="slider container-fluid">
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <Menu hovered={hovered} setHovered={setHovered} setData={setData} />
        <HoverMenu hovered={hovered} setHovered={setHovered} data={data} />
        <Slider />
      </div>

      <h1 className="text-center mt-5">Sản phẩm nổi bật</h1>
      <ListItem />

      <h1 className="text-center">Dành cho bạn</h1>
      <HomeShopping />
    </div>
  );
};

export default Home;

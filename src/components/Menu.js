import { List, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

import LaptopIcon from "@mui/icons-material/Laptop";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import SettingsInputHdmiIcon from "@mui/icons-material/SettingsInputHdmi";
import SpeakerGroupIcon from "@mui/icons-material/SpeakerGroup";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { ListButton } from "../assets/style/Style";

const Menu = ({ hovered, setHovered, setData }) => {
  const handleHover = () => {
    setHovered(!hovered);
  };
  return (
    <div style={{ width: "30%", height: "100%" }}>
      <List
        sx={{
          width: "100%",
          bgcolor: "white",
          borderRadius: 5,
          marginTop: 1,
          zIndex: 2,
        }}
        component="nav"
      >
        <ListButton
          onMouseEnter={() => {
            setHovered(true);
            setData("1");
          }}
          onMouseLeave={handleHover}
        >
          <ListItemIcon>
            <LaptopChromebookIcon />
          </ListItemIcon>
          <ListItemText primary="Laptop" />
        </ListButton>

        <ListButton
          onMouseEnter={() => {
            setHovered(true);
            setData("12,7,11");
          }}
          onMouseLeave={handleHover}
        >
          <ListItemIcon>
            <LaptopIcon />
          </ListItemIcon>
          <ListItemText primary="Main, CPU, VGA" />
        </ListButton>

        <ListButton
          onMouseEnter={() => {
            setHovered(true);
            setData("8,9");
          }}
          onMouseLeave={handleHover}
        >
          <ListItemIcon>
            <SettingsInputHdmiIcon />
          </ListItemIcon>
          <ListItemText primary="Case, Nguồn" />
        </ListButton>

        <ListButton
          onMouseEnter={() => {
            setHovered(true);
            setData("5,6");
          }}
          onMouseLeave={handleHover}
        >
          <ListItemIcon>
            <SpeakerGroupIcon />
          </ListItemIcon>
          <ListItemText primary="SSD, RAM" />
        </ListButton>

        <ListButton
          onMouseEnter={() => {
            setHovered(true);
            setData("10");
          }}
          onMouseLeave={handleHover}
        >
          <ListItemIcon>
            <SdStorageIcon />
          </ListItemIcon>
          <ListItemText primary="Tai nghe, Loa" />
        </ListButton>

        <ListButton
          sx={{ marginBottom: 0 }}
          onMouseEnter={() => {
            setHovered(true);
            setData("3,2,4");
          }}
          onMouseLeave={handleHover}
        >
          <ListItemIcon>
            <SportsEsportsIcon />
          </ListItemIcon>
          <ListItemText primary="Chuột, Bàn Phím, Màn hình" />
        </ListButton>
      </List>
    </div>
  );
};
export default Menu;

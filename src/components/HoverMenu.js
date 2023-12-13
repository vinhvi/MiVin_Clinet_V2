import { Box, Paper, Stack, Typography } from "@mui/material";
import {
  dataGaming,
  dataGaming2,
  dataLK,
  dataLK2,
  dataLap,
  dataLap2,
  dataPK,
  dataPK2,
  dataStorage,
  dataStorage2,
  dataTn,
  dataTn2,
} from "../assets/action/Data";
import { useEffect, useState } from "react";
import { BoxMenu, TextMenu } from "../assets/style/Style";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
function HoverMenu({ hovered, setHovered, data }) {
  const handleHover = () => {
    setHovered(!hovered);
  };
  const [daa, setDaa] = useState("");
  const [daas, setDaas] = useState("");
  useEffect(() => {
    switch (data) {
      case "12,7,11":
        setDaa(dataPK);
        setDaas(dataPK2);
        break;
      case "1":
        setDaa(dataLap);
        setDaas(dataLap2);
        break;
      case "8,9":
        setDaa(dataGaming);
        setDaas(dataGaming2);
        break;
      case "5,6":
        setDaa(dataStorage);
        setDaas(dataStorage2);
        break;
      case "10":
        setDaa(dataTn);
        setDaas(dataTn2);
        break;
      case "3,2,4":
        setDaa(dataLK);
        setDaas(dataLK2);
        break;
      default:
        break;
    }
  }, [data]);
  const history = useHistory();

  const handled = (as) => {
    history.push(`/Find/${data + ":" + as}`);
  };
  return (
    <>
      {hovered ? (
        <Paper
          sx={{
            position: "absolute",
            width: 820,
            display: "flex",
            borderRadius: "10px",
            backgroundColor: "white",
            zIndex: 3,
            marginLeft: 30,
            height: 350,
            marginTop: 1,
          }}
          onMouseLeave={handleHover}
          onMouseEnter={() => setHovered(true)}
        >
          <Stack sx={{ flex: 1 }}>
            <BoxMenu>
              {daa ? (
                daa.map((item, index) => {
                  return (
                    <Box sx={{ flex: 1, height: "100%" }} key={index}>
                      <Typography variant="h6" color={"red"}>
                        {item.id}
                      </Typography>
                      {item.type.map((name, index) => {
                        return (
                          <TextMenu
                            variant="body2"
                            key={index}
                            onClick={() => handled(name.name)}
                          >
                            {name.name}
                          </TextMenu>
                        );
                      })}
                    </Box>
                  );
                })
              ) : (
                <></>
              )}
            </BoxMenu>
            <BoxMenu>
              {daas ? (
                daas.map((item, index) => {
                  return (
                    <Box sx={{ flex: 1, height: "100%" }} key={index}>
                      <Typography variant="h6" color={"red"}>
                        {item.id}
                      </Typography>
                      {item.type.map((name, index) => {
                        return (
                          <TextMenu
                            variant="body2"
                            key={index}
                            onClick={() => handled(name.name)}
                          >
                            {name.name}
                          </TextMenu>
                        );
                      })}
                    </Box>
                  );
                })
              ) : (
                <></>
              )}
            </BoxMenu>
          </Stack>
        </Paper>
      ) : null}
    </>
  );
}

export default HoverMenu;

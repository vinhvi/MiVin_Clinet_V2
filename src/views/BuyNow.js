import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function BuyNow() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState("");
  const [image, setImage] = useState("");
  const [value, setValue] = useState("Thanh toán khi nhận hàng");
  const [sale, setSale] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [note, setNote] = useState("");
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`/api/v1/products/getById/${id}`)
      .then(function (response) {
        setData(response.data);
        setImage(response.data.imageProducts[0].imageLink);
        setSale(response.data.sale.discount);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const inputQuantity = (e) => {
    if (e > data.quantity || e < 0) {
      toast.error("Vui lòng nhập số khác");
    } else {
      setQuantity(e);
    }
  };
  const checkQ = (e) => {
    if (e === "down") {
      if (quantity === 1) {
        setQuantity(1);
      } else {
        setQuantity(quantity - 1);
      }
    } else {
      if (quantity > data.quantity) {
        toast.error("Vui lòng nhập số khác");
        setQuantity(1);
      } else {
        setQuantity(quantity + 1);
      }
    }
  };

  const handleSubmit = (e) => {
    console.log(quantity);
    const orderData = {
      note,
      customer: {
        id: dataUser.id,
      },
      statusOrder: value === "Thanh toán khi nhận hàng" ? 1 : 3,
      paymentType: value,
      statusPayment: value === "Thanh toán khi nhận hàng" ? 0 : 1,
      orderDetails: [
        {
          quantity: quantity,
          product: {
            id: data.id,
          },
        },
      ],
    };
    console.log(orderData);
    axios
      .post(`/api/v1/orders/createNow`, orderData)
      .then(function (response) {
        if (value === "Thanh toán online") {
          axios
            .post("/api/v1/payments/paymentWithVNPAY", {
              idOrder: response.data.id,
              price: sale
                ? data.price -
                  ((data.price * data.sale?.discount) / 100) * quantity
                : data.price * quantity,
            })
            .then(function (response) {
              window.open(response.data.url, "_self");
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          toast.success("Thành công");
          history.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Stack
      direction={"row"}
      gap={5}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {data !== "" ? (
        <>
          <Box sx={{ marginTop: 2 }}>
            <Card sx={{ width: 700 }}>
              <Stack direction={"row"} sx={{ padding: 2 }}>
                <CardMedia
                  sx={{ height: 150, width: 150 }}
                  image={image}
                  title="green iguana"
                  component="img"
                  alt="imageProdut"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.productName || ""}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Hãng: {data.brand.name || ""}
                  </Typography>
                  <Typography variant="h6">
                    Đơn giá:{" "}
                    {data.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </Typography>
                  <Stack
                    direction={"row"}
                    sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
                  >
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => checkQ("down")}
                    >
                      <RemoveCircleIcon
                        fontSize="inherit"
                        sx={{ color: "blue" }}
                      />
                    </IconButton>
                    <OutlinedInput
                      type="number"
                      id="outlined-adornment-weight"
                      value={quantity}
                      sx={{ height: "40px" }}
                      onChange={(e) => inputQuantity(Number(e.target.value))}
                    />
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => checkQ("up")}
                    >
                      <AddCircleIcon
                        fontSize="inherit"
                        sx={{ color: "blue" }}
                      />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Stack>
            </Card>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Phương thức thanh toán
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Thanh toán khi nhận hàng"
                  control={<Radio />}
                  label="Thanh toán khi nhận hàng"
                />
                <FormControlLabel
                  value="Thanh toán online"
                  control={<Radio />}
                  label="Thanh toán online"
                />
              </RadioGroup>
            </FormControl>
            <Box
              sx={{
                backgroundColor: "white",
                marginTop: 2,
                height: 90,
                paddingLeft: 3,
                paddingRight: 3,
              }}
            >
              <Typography variant="h5">Ghi chú</Typography>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                label="Ghi chú"
                sx={{ marginTop: 1 }}
                onChange={(e) => setNote(e.target.value)}
              />
            </Box>
          </Box>
          <Paper sx={{ width: "35vw", marginTop: 2 }}>
            <Box sx={{ backgroundColor: "#DDDDDD", padding: 2 }}>
              <Typography variant="h4">Tổng kết</Typography>
              <Typography variant="subtitle1">1 mặt hàng</Typography>
            </Box>
            <Stack
              direction={"row"}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
                paddingLeft: 2,
              }}
            >
              <Box width={150}>
                <Typography variant="h5">Tổng tiền</Typography>
              </Box>
              <Box width={10}>
                <Typography variant="h5">{quantity}</Typography>
              </Box>
              <Box width={180}>
                <Typography variant="h5">
                  {(data.price * quantity)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  đ
                </Typography>
              </Box>
            </Stack>
            <Divider />

            <Stack
              direction={"row"}
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: 2,
              }}
            >
              <Box width={150}>
                <Typography variant="h5">Khuyến mãi</Typography>
              </Box>
              <Box width={10}>
                <Typography variant="h5">
                  {data.sale?.discount || 0}%
                </Typography>
              </Box>
              {data.sale?.discount ? (
                <Box width={180}>
                  <Typography variant="h5">
                    {((data.price * data.sale.discount) / 100) *
                      quantity
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </Typography>
                </Box>
              ) : (
                <Box width={180}>
                  <Typography variant="h5">{0}đ</Typography>
                </Box>
              )}
            </Stack>

            <Box sx={{ backgroundColor: "#DDDDDD", padding: 2, marginTop: 2 }}>
              <Stack
                direction={"row"}
                sx={{
                  marginTop: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" width={150}>
                  Tổng số tiền
                </Typography>
                <Typography variant="h5" width={50}></Typography>
                {sale ? (
                  <Typography variant="h5" width={160}>
                    {data.price -
                      ((data.price * data.sale?.discount) / 100) *
                        quantity
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </Typography>
                ) : (
                  <Typography variant="h5" width={160}>
                    {data.price *
                      quantity
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </Typography>
                )}
              </Stack>
            </Box>
            <Box
              sx={{
                flex: 1,
                height: 100,
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ height: 50, borderRadius: 10, width: 300 }}
                onClick={handleSubmit}
              >
                Mua ngay
              </Button>
            </Box>
          </Paper>
        </>
      ) : null}
    </Stack>
  );
}

export default BuyNow;

import React from "react";
import "../../styles/ConfirmOrder.scss";
import { Box, Divider, Stack, Typography } from "@mui/material";
const ConfirmOrder = ({
  cart,
  value,
  setPopupVisible,
  user,
  handleConfirm,
  total,
}) => {
  return (
    // ===================
    <div class="containerFormCheckOut">
      <div class="cardFormCheckOut cartFormCheckOut">
        <div class="titleFormCheckOut">
          <label>XÁC NHẬN ĐƠN HÀNG </label>
          <button
            className="closeBtn"
            onClick={() => {
              setPopupVisible(false);
            }}
          >
            X
          </button>
        </div>
        <div class="stepsFormCheckOut">
          <div class="stepFormCheckOut">
            <div>
              <span className="spanConFirmOrder">Tên khách hàng</span>
              <p>
                {user.lastName} {user.firstName}
              </p>
            </div>
            <div>
              <span className="spanConFirmOrder">Địa chỉ giao hàng</span>
              <p>{user.address}</p>
            </div>
            <div>
              <span className="spanConFirmOrder">Số điện thoại nhận hàng</span>
              <p>{user.phone}</p>
            </div>

            <div>
              <span className="spanConFirmOrder">Phương thức thanh toán</span>
              <p>{value}</p>
            </div>
            {/* <hr /> */}

            <span className="spanConFirmOrder">Chi tiết đơn hàng</span>
            <div class="item">
              {cart.map((item, i) => (
                <div key={item.product.id}>
                  <Box>
                    <Stack
                      direction={"row"}
                      sx={{
                        color: "#19376D",
                        justifyContent: "space-between",
                        paddingRight: 2,
                      }}
                    >
                      <Typography sx={{ width: 350 }}>
                        {item.product.productName}
                      </Typography>

                      <Typography sx={{ width: 120 }}>
                        Số lượng: {item.quantity}
                      </Typography>
                    </Stack>
                    <Divider sx={{ border: "1px solid black", marginTop: 1 }} />
                  </Box>
                </div>
              ))}
            </div>

            {/* <hr /> */}
            <div class="paymentsFormCheckOut">
              {/* <span className="spanConFirmOrder">Số tiền Cần thanh toán</span> */}
              <div class="details">
                {/* <span className="spanConFirmOrder">Subtotal:</span> */}
                {/* <span className="spanConFirmOrder">{total} vnd</span> */}
                {/* <span className="spanConFirmOrder">Shipping:</span>
                <span className="spanConFirmOrder">$10.00</span>
                <span className="spanConFirmOrder">Tax:</span>
                <span className="spanConFirmOrder">$30.40</span> */}
              </div>
            </div>
          </div>
        </div>
        <div class="cardFormCheckOut checkout">
          <div class="footer">
            <label class="titleFormCheckOut">
              Tổng số tiền cần thanh toán :{" "}
              {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} vnd
            </label>

            <button
              class="checkout-btn"
              onClick={() => {
                handleConfirm();
              }}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;

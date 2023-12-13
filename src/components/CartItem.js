// CartItem.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { OutlinedInput } from "@mui/material";

const CartItem = (props) => {
  console.log(props);
  const { item, selected, onSelect } = props;
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.quantity * item.product.price);

  const handleQuantityItemPlus = async () => {
    try {
      axios.post("/api/v1/shoppingCartDetails/saveOrUpdate", {
        id: item.id,
        product: { id: item.product.id },
        shoppingCart: { id: item.shoppingCart.id },
        quantity: quantity + 1,
      });

      setQuantity(quantity + 1);
      setPrice((quantity + 1) * item.product.price);
      props.updateCart();
      toast.success("Cập nhật sản phẩm thành công");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  const handleQuantityItemMinus = async () => {
    if (quantity === 1) {
      try {
        await axios.delete(`/api/v1/shoppingCartDetails/delete/${item.id}`);

        props.updateCart();
        toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    } else {
      try {
        axios.post("/api/v1/shoppingCartDetails/saveOrUpdate", {
          id: item.id,
          product: { id: item.product.id },
          shoppingCart: { id: item.shoppingCart.id },
          quantity: quantity - 1,
        });

        setQuantity(quantity - 1);
        setPrice((quantity - 1) * item.product.price);
        props.updateCart();
        toast.success("Cập nhật sản phẩm thành công");
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    }
  };

  const inputQuantity = (e) => {
    setQuantity(e);
    if (e > 0) {
      try {
        axios.post("/api/v1/shoppingCartDetails/saveOrUpdate", {
          id: item.id,
          product: { id: item.product.id },
          shoppingCart: { id: item.shoppingCart.id },
          quantity: e,
        });

        setQuantity(e);
        setPrice(e * item.product.price);
        props.updateCart();
        toast.success("Cập nhật sản phẩm thành công");
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/shoppingCartDetails/delete/${item.id}`);

      props.updateCart();
      toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  return (
    <div className="row">
      <div className="col-lg-1 col-md-12 mb-4 mb-lg-0">
        <input type="checkbox" checked={selected} onChange={onSelect} />
      </div>
      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
        <img
          alt=""
          src={
            item.product.imageProducts.length > 0
              ? item.product.imageProducts[0].imageLink
              : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-32.png"
          }
          className="w-100"
        />
      </div>

      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
        <div style={{ height: "65px" }}>
          <strong>{item.product.productName}</strong>
        </div>
        <p>{`Đơn giá : ${item.product.price} VND`}</p>
        <button
          type="button"
          className="btn btn-primary btn-sm me-1 mb-2"
          onClick={handleDelete}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>

      <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
        <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
          <button
            type="button"
            className="btn btn-primary px-2 me-2"
            onClick={handleQuantityItemMinus}
          >
            <i className="fas fa-minus"></i>
          </button>

          <div className="form-outline">
            <OutlinedInput
              type="number"
              id="outlined-adornment-weight"
              value={quantity}
              sx={{ height: "40px" }}
              onChange={(e) => inputQuantity(Number(e.target.value))}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary px-2 ms-2"
            onClick={handleQuantityItemPlus}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        <p className="text-start text-md-center">
          <strong>
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
          </strong>
        </p>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default CartItem;

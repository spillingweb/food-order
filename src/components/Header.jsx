import { useContext } from "react";

import headerImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext)

  const totalCartItems = cartItems.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={headerImg} alt="Food Logo" />
          <h1>React Food</h1>
        </div>
        <nav>
          <Button textOnly={true} onClick={handleShowCart}>
            Cart ({totalCartItems})
          </Button>
        </nav>
      </header>
    </>
  );
}

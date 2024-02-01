import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import CartItem from "./CartItem";

export default function Cart() {
  const { cartItems, updateItemQuantity } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleOpenCheckout() {
    userProgressCtx.showCheckout();
  }

  function handleUpdateCart(id, amount) {
    updateItemQuantity(id, amount);
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}  onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((meal) => (
          <CartItem key={meal.id} meal={meal} onUpdate={handleUpdateCart} />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartItems.length > 0 && (
          <Button textOnly={false} onClick={handleOpenCheckout}>
            Go to Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}

import Input from "./UI/Input";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import { UserProgressContext } from "../store/UserProgressContext";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import useHttp from "../hooks/useHttp";

let requestConfig = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
};

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  function handleSubmitOrder(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd);

    sendRequest(
      JSON.stringify({
        order: {
          items: cartItems,
          customer: customerData,
        },
      })
    );

    event.target.reset();
  }

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    clearCart();
    clearData();
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleClose}>
        Close
      </Button>
      <Button textOnly={false}>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button textOnly={false} onClick={handleFinish}>
            Okay
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form method="dialog" onSubmit={handleSubmitOrder}>
        <h2>Checkout</h2>
        <p>Total Amount {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full name" id="name" type="text" />
        <Input label="E-mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

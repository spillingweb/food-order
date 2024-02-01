import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Menu from "./components/Menu";
import CartContextProvider from "./store/CartContext";
import UserProgressContextProvider from "./store/UserProgressContext";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <main>
            <Menu />
          </main>
          <Cart />
          <Checkout />
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;

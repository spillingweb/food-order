import { currencyFormatter } from "../util/formatting";

export default function CartItem({meal, onUpdate}) {

  return (
    <li className="cart-item">
      <p>
        {`${meal.name} - ${meal.quantity} x ${currencyFormatter.format(
          meal.price
        )}`}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => onUpdate(meal.id, -1)}>-</button>
        <span>{meal.quantity}</span>
        <button onClick={() => onUpdate(meal.id, 1)}>+</button>
      </p>
    </li>
  );
}

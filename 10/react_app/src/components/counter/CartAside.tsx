type CartAsideProps = {
  count: number;
};

function CartAside({ count }: CartAsideProps) {
  return (
    <aside className="cart-aside">
      <h2>Cart</h2>
      <div className="items-added">{count} items added</div>

      <p className="hint">
        <code>count</code> is owned by the page and passed down through props.
      </p>
    </aside>
  );
}

export default CartAside;

type ShopNavbarProps = {
  count: number;
};

function ShopNavbar({ count }: ShopNavbarProps) {
  return (
    <nav className="shop-navbar">
      <div className="brand">Shop Demo</div>
      <div className="cart-icon-wrap" aria-label="Cart">
        🛒<span className="cart-badge">{count}</span>
      </div>
    </nav>
  );
}

export default ShopNavbar;

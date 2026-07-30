import { useState } from 'react';
import './Counter.css';

function Counter() {
  // 1. state and state update
  const [count, setCount] = useState(0);

  return (
    <div className="shop">
      <nav className="shop-navbar">
        <div className="brand">Shop Demo</div>
        <div className="cart-icon-wrap" aria-label="Cart">
          🛒
          {/* 2. use state variable in the html */}
          <span className="cart-badge">{count}</span>
        </div>
      </nav>

      <div className="layout">
        <main className="shop-main">
          <h1>Counter</h1>
          <p>Each click updates one shared count — shown in three places on this page.</p>
          <div className="counter">
            {/* 3. event listener */}
            <button type="button" onClick={() => setCount(count - 1)}>
              −
            </button>
            <span>{count}</span>
            <button type="button" onClick={() => setCount(count + 1)}>
              +
            </button>
          </div>
        </main>

        <aside className="cart-aside">
          <h2>Cart</h2>
          <div className="items-added">{count} items added</div>
          <p className="hint">
            The aside, navbar badge, and counter all read from the same <code>count</code> state
            via <code>useState</code>.
          </p>
        </aside>
      </div>
    </div>
  );
}

export default Counter;

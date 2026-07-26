import { useState } from 'react';
import ShopNavbar from '../components/counter/ShopNavbar';
import CounterMain from '../components/counter/CounterMain';
import CartAside from '../components/counter/CartAside';
import './Counter.css';

function CounterEnhanced() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    if (count > 0) setCount(count - 1);
  }

  return (
    <div className="shop">
      <ShopNavbar count={count} />

      <div className="layout">
        <CounterMain
          count={count}
          onIncrease={increase}
          onDecrease={decrease}
        />

        <CartAside count={count} />
      </div>
    </div>
  );
}

export default CounterEnhanced;

import CounterButton from './CounterButton';
import CounterValue from './CounterValue';

type CounterMainProps = {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

function CounterMain({ count, onIncrease, onDecrease }: CounterMainProps) {
  return (
    <main className="shop-main">
      <h1>Counter</h1>
      <p>State lives in CounterEnhanced and is drilled down through props.</p>

      <div className="counter">
        <CounterButton label="Decrease" onClick={onDecrease} />
        <CounterValue count={count} />
        <CounterButton label="Increase" onClick={onIncrease} />
      </div>
    </main>
  );
}

export default CounterMain;

type CounterValueProps = {
  count: number;
};

function CounterValue({ count }: CounterValueProps) {
  return <span>{count}</span>;
}

export default CounterValue;

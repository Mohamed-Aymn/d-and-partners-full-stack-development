type CounterButtonProps = {
  label: string;
  onClick: () => void;
};

function CounterButton({ label, onClick }: CounterButtonProps) {
  return (
    <button type="button" aria-label={label} onClick={onClick}>
      {label === 'Decrease' ? '−' : '+'}
    </button>
  );
}

export default CounterButton;

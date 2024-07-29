import { useState } from "react";

export default function App() {
  return (
    <div className="app">
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = (bill * ((percentage1 + percentage2) / 2)) / 100;

  function resetBill() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <BillingInput bill={bill} onSetBill={setBill} />
      <SelectPercentage
        percentage={percentage1}
        onSetPercentage={setPercentage1}
      >
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage
        percentage={percentage2}
        onSetPercentage={setPercentage2}
      >
        How did your friend like the service?
      </SelectPercentage>
      {bill > 0 && (
        <>
          <TotalAmount bill={bill} tip={tip} />
          <Reset onResetBill={resetBill} />
        </>
      )}
    </div>
  );
}
function BillingInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="bill value"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function SelectPercentage({ children, percentage, onSetPercentage }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSetPercentage(e.target.value)}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}
function TotalAmount({ bill, tip }) {
  return (
    <h3>
      You pay {bill + tip} (${bill} + ${tip})
    </h3>
  );
}
function Reset({ onResetBill }) {
  return <button onClick={onResetBill}>Reset</button>;
}

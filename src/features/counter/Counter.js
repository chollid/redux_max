import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
import "../../index.css";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState(0);

  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  React.useEffect(() => {
    console.log("incrementAmount", incrementAmount);
  }, []);

  return (
    <section className='counter'>
      <p>{count}</p>
      <div className='counter-buttons'>
        <button onClick={() => dispatch(increment())} className='button'>
          +
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className='button'
          style={{ marginLeft: "16px" }}
        >
          -
        </button>
      </div>
      <div>
        <p className='small-font'>Increment by:</p>
        <input
          className='input'
          value={incrementAmount}
          type='text'
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
      </div>
      <button onClick={() => dispatch(incrementByAmount(addValue))}>
        Add Amount
      </button>
      <button onClick={() => dispatch(resetAll())}>Reset</button>
    </section>
  );
};

export default Counter;

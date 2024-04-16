import React, { useState } from "react";

const ItemCount = ({ stock, initial, onAdd, onRemove }) => {
  const [count, setCount] = useState(initial);

  const handleCountChange = (value) => {
    const newCount = count + value;
    if (newCount >= 0 && newCount <= stock) {
      setCount(newCount);
    }
    if (value === 1) {
      onAdd(1);
    }
    if (value === -1) {
      onRemove(1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => handleCountChange(-1)}
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l hover:bg-gray-300 focus:outline-none"
      >
        -
      </button>
      <input
        type="text"
        value={count}
        readOnly
        className="w-16 text-center bg-gray-100 text-gray-700 rounded"
      />
      <button
        onClick={() => handleCountChange(1)}
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r hover:bg-gray-300 focus:outline-none"
      >
        +
      </button>
    </div>
  );
};

export default ItemCount;

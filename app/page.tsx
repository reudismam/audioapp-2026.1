
"use client"

import { useState } from "react";

export default function Home() {
  const [contador, setContador] = useState<number>(0);

  const increment = () => {
    setContador(contador + 1);
  }

  const decrement = () => {
    setContador(contador - 1);
  }

  return (
    <div className="items-center flex flex-col rounded-2xl border-gray-500 border-2 w-50 m-0 mr-auto ml-auto">
      <p>{contador}</p>
      <div className="flex gap-2">
        <button onClick={()=> decrement()} className="bg-blue-300">Decrementar</button>
        <button onClick={()=> increment()} className="bg-blue-300">Incrementar</button>
      </div>
    </div>
  );
}

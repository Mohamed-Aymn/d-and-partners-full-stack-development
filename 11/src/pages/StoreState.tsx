import { useState } from "react";

function StoreState() {

  const [store, setStore] = useState({
    iceCreamsMade: 0,
    flavorsCount: {
      vanilla: 10,
      chocolate: 10,
      Mango: 10
    },
  });

  return (
    <div>
      <h1>Store State</h1>

      <h2>IceCreams</h2>
      <p>Ice Creams Made: {store.iceCreamsMade}</p>

      <h2>Flavors</h2>
      <p>Vanilla Flavors Count: {store.flavorsCount.vanilla}</p>
      <p>Chocolate Flavors Count: {store.flavorsCount.chocolate}</p>
      <p>Mango Flavors Count: {store.flavorsCount.Mango}</p>

      <br />
      <hr />
      <br />

      <h2>Actions</h2>
      <br />

      <div className="flex gap-1 justify-center items-center mb-8">
        <button
          className="bg-orange-400 text-white p-2"
          onClick={() => {
            setStore((prevStore) => ({
              ...prevStore,
              iceCreamsMade: prevStore.iceCreamsMade + 1,
              flavorsCount: {
                ...prevStore.flavorsCount,
                vanilla: prevStore.flavorsCount.vanilla - 1,
                chocolate: prevStore.flavorsCount.chocolate - 1,
              },
            }));
          }}
        >
          ChocoVanilla
        </button>

        <button
          className="bg-orange-500 text-white p-2"
          onClick={() => {
            setStore((prevStore) => ({
              ...prevStore,
              iceCreamsMade: prevStore.iceCreamsMade + 1,
              flavorsCount: {
                ...prevStore.flavorsCount,
                vanilla: prevStore.flavorsCount.vanilla - 1,
                Mango: prevStore.flavorsCount.Mango - 1,
              },
            }));
          }}
        >
          MangoVanilla
        </button>
        <button
          className="bg-orange-700 text-white p-2"
          onClick={() => {
            setStore((prevStore) => ({
              ...prevStore,
              iceCreamsMade: prevStore.iceCreamsMade + 1,
              flavorsCount: {
                ...prevStore.flavorsCount,
                chocolate: prevStore.flavorsCount.chocolate - 1,
                Mango: prevStore.flavorsCount.Mango - 1,
              },
            }));
          }}
        >
          ChocoMango
        </button>
      </div>

    </div>
  )
}

export default StoreState
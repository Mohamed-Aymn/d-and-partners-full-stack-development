import { useReducer } from "react";

type StoreState = {
  iceCreamsMade: number;
  flavorsCount: {
    vanilla: number;
    chocolate: number;
    Mango: number;
  };
};

type Action = "ChocoVanilla" | "MangoVanilla" | "ChocoMango"

function reducerFunction(state: StoreState, action: Action): StoreState {
  switch (action) {
    case "ChocoVanilla":
      return {
        ...state,
        iceCreamsMade: state.iceCreamsMade + 1,
        flavorsCount: {
          ...state.flavorsCount,
          vanilla: state.flavorsCount.vanilla - 1,
          chocolate: state.flavorsCount.chocolate - 1,
        },
      };
    case "MangoVanilla":
      return {
        ...state,
        iceCreamsMade: state.iceCreamsMade + 1,
        flavorsCount: {
          ...state.flavorsCount,
          vanilla: state.flavorsCount.vanilla - 1,
          Mango: state.flavorsCount.Mango - 1,
        },
      };
    case "ChocoMango":
      return {
        ...state,
        iceCreamsMade: state.iceCreamsMade + 1,
        flavorsCount: {
          ...state.flavorsCount,
          chocolate: state.flavorsCount.chocolate - 1,
          Mango: state.flavorsCount.Mango - 1,
        },
      };

    default:
      return state;
  }
}

function StoreStateEnhanced() {
  const [store, dispatch] = useReducer(reducerFunction, {
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
          onClick={() => dispatch("ChocoVanilla")}
        >
          ChocoVanilla
        </button>

        <button
          className="bg-orange-500 text-white p-2"
          onClick={() => dispatch("MangoVanilla")}
        >
          MangoVanilla
        </button>
        <button
          className="bg-orange-700 text-white p-2"
          onClick={() => dispatch("ChocoMango")}
        >
          ChocoMango
        </button>
      </div>

    </div>

  )
}

export default StoreStateEnhanced
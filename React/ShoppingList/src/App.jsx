import "./App.css";
import ShoppingList from "./ShoppingList";
const items = [
  { id: 1, name: "Eggs", quantity: 12, purchased: false },
  { id: 2, name: "Milk", quantity: 1, purchased: true },
  { id: 3, name: "Apples", quantity: 4, purchased: false },
  { id: 4, name: "Carrots", quantity: 6, purchased: true },
];

function App() {
  return (
    <div>
      <ShoppingList items={items} />
    </div>
  );
}

export default App;

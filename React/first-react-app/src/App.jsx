import "./App.css";
import Chicken from "./Chicken";
import Greeter from "./Greeter";
import Die from "./Die";
import ListPicker from "./ListPicker";
import DoubleDice from "./DoubleDice";
function App() {
  return (
    <div>
      <Chicken />
      <Greeter person="Ankit" />
      {/* When passing in numbers like we're doing below instead of passing them as strings just use the {} to treat whatever you write in between those brackets as JS and it will send the number 20 rather then sending the string "20" */}
      <Die numSides={20} />
      <Die numSides={6} />
      <Die numSides={10} />
      <Die />
      <ListPicker values={[1, 2, 3]} />
      <ListPicker values={["a", "b", "c"]} /> {/* First {} is just to escape jsx and allows us to write JS code. */}
      {/* Incase you need to pass in a object */}
      {/* <ListPicker values={{ name: "ankit", age: 25 }} /> */}
      <DoubleDice/>
      <DoubleDice/>
      <DoubleDice/>
    </div>
  );

}

export default App;

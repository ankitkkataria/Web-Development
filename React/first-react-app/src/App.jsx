import "./App.css";
import Chicken from "./Chicken";
import Greeter from "./Greeter";
import Die from "./Die";
import ListPicker from "./ListPicker";
import DoubleDice from "./DoubleDice";
import Heading from "./Heading";
import ColorList from "./ColorList";
import Slots from "./Slots";
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
      <Heading text="Hi Bro!"color="magenta" fontSize="48px"/>
      <ColorList colors={['teal','pink','orange','blue']} />
      <Slots val1="d" val2="d" val3="d"/>
      <Slots val1="a" val2="d" val3="d"/>
    </div>
  );

}

export default App;

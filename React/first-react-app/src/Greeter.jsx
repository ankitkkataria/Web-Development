// export default function Greeter(props) { // props will contain all the properties that we send from our jsx file whereever we render this component.
//     return <h3>Hi! There, {props.person}</h3>
// }

export default function Greeter({ person }) { // Here person is called a prop or you can think of it as a argument.
  return <h3>Hi there, {person}!</h3>;
}

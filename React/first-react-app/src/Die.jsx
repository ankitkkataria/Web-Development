export default function Die({ numSides = 6 }) { // 6 is the default value that numSides will have if you don't pass in any property called numSides while rendering this component.
  const roll = Math.floor(Math.random() * numSides) + 1;
  return (
    <p>
      {numSides}-sided die roll: {roll}
    </p>
  );
}

export default function ListPicker({ values }) {
  const randIdx = Math.floor(Math.random() * values.length);
  return (
    <div>
      <p>List contains: {values}</p>
      <p>Random element from the list: {values[randIdx]}</p>
    </div>
  );
}

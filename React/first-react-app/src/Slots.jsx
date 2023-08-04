export default function Slots({ val1, val2, val3 }) {
  const isWinner = val1 === val2 && val2 === val3;
  return (
    <div>
      <h1>
        {val1} {val2} {val3}
      </h1>
      <h2 style={{ color: isWinner ? "green" : "red" }}>
        {isWinner ? "You Won!" : "You Lost :("}
      </h2>
      {isWinner && <h3 style={{color: "green"}}>Congrats!</h3>} 
      {/* The color you put in here like this must be string or for that matter all the properties that you put in styles should be strings and nothing else otherwise I was just left scratching my head what exactly is the mistake that I'm making so keep in mind green won't work but "green" will. */}
    </div>
  );
}

export default function ColorList({ colors }) {
  return (
    <div>
      <h6>ColorList</h6>
      <ul>
        {/* When you pass in a array in jsx it just goes through the array and renders each and every element in it so down below I'm just passing in a array into jsx and it just renders it on the page. */}
        {colors.map((item) => ( 
          <li style={{color: item}}>{item}</li> // This is what the array will look like [<li>teal</li>,<li>pink</li>,<li>orange</li>,<li>blue</li>]   
        ))}
      </ul>
    </div>
  );
}

function ShoppingListItem({ name, quantity, purchased}) { // See you could have also sent the entire item object from the ShoppingList component but when there are a few properties you want like this case it's better to send all of them separtely it just makes thins a bit easier to read.
  const styles = {
    color: purchased === true ? "grey" : "black",
    textDecoration: purchased ? "line-through" : "none",
  };
  return (
    <li style={styles}>
      {name} - {quantity}
    </li>
  );
}

export default ShoppingListItem; // Just using another way so you don't forget it this is also the way something can be exported.
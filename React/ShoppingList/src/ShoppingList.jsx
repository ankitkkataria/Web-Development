import ShoppingListItem from "./ShoppingListItem";
export default function ShoppingList({ items }) {
  return (
    <div>
      <ul>
        {items.map((item) => (
        //   <ShoppingListItem
        //     key={item.id} // This key prop is needed so every item in a array in react can be mapped to something unique this is not needed when your array is static but react will still throw a warning but it becomes absolutely essential when the array can be changed dynamically whether that be adding or removing or shifting elements in an array without this unique identifier being mapped to every element in the array those things will cause a huge issue even I don't know what that issue will be as of yet.
        //     name={item.name}
        //     quantity={item.quantity}
        //     purchased={item.purchased}
        //   />
        //   And if you're passing all the values by their original names and you're expecting the same name in the props in ShoppingListItem component instead of using lines line 8,9,10 & 11 you can just use the spread operator.
        <ShoppingListItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}

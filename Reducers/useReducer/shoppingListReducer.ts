//TYPES
type Category = "Bread" | "Fruit" | "Vegetable" | "Meat" | "Milk";

interface ShoppingListItem {
  id: string;
  title: string;
  completed: boolean;
  category: Category;
}

type ShoppingListState = ShoppingListItem[];

//REDUCER ACTIONS
interface AddAction {
  type: "add";
  category: Category;
}
interface EditAction {
  type: "edit";
  id: string;
  title: string;
}
interface DeleteAction {
  type: "delete";
  id: string;
}
interface CompleteAction {
  type: "complete";
  id: string;
}
export type ShoppingListAction = AddAction | EditAction | DeleteAction | CompleteAction;

//the actual reducer function
function shoppingReducer(state: ShoppingListState, action: ShoppingListAction): ShoppingListState {
  switch (action.type) {
    case "add":
      return state.concat({
        // Good enough random ID generator.
        id: `${Math.random()}-${Date.now()}`,
        title: "",
        category: action.category,
        completed: false,
      });
    case "complete":
      return state.map((item) => {
        if (item.id === action.id) {
          return { ...item, completed: true };
        }
        return item;
      });
    case "delete":
      return state.filter((item) => item.id !== action.id);
    case "edit":
      return state.map((item) => {
        if (item.id === action.id) {
          return { ...item, title: action.title };
        }
        return item;
      });
    default:
      return state;
  }
}

//to use this in a component, we'd import the recuder (if it was in a different file) and define like so:\

// const [state, dispatch] = useReducer(shoppingReducer, []);

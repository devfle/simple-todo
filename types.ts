interface TodoItem {
  id: number;
  title: string;
  text: string;
  icon: string;
  state: string;
  assignedUser: string;
}

interface NavigationData {
  name: string;
  selectedItem: number;
}

interface NavigationContextData {
  page: NavigationData;
  setPage: (state: NavigationData) => void;
}

interface TodoContextData {
  todoItems: TodoItem[];
  setTodoItems: (state: TodoItem[]) => void;
}

export { NavigationData, TodoItem, TodoContextData, NavigationContextData };

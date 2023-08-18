import { createContext } from 'react';

const TodoContext = createContext<null | TodoContextData>(null);
const NavigationContext = createContext<null | NavigationContextData>(null);

export { TodoContext, NavigationContext };

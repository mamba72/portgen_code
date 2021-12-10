import { createContext, useContext } from 'react';

/* Creates the actual Context objects */
export const UserContext = createContext({
  user: {}, // data object stored
  setUser: () => {} // updater function so child components can modify
});

/* 
* Utility function for whenever you want to 
* consume the context data or setter function
*/
export function useUser() {
  return useContext(UserContext);
}
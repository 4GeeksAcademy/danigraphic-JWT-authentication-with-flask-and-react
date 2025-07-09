const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null
    },
    actions: {
      set_hello: msg => {
        setStore({ message: msg });
      }
    }
  };
};

export default getState;

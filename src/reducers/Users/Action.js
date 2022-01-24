export const addUsers = (user) => {
    return {
      type: "ADD_USERS",
      payload: user,
    };
  };
  export const addToken = (token) => {
    return {
      type: "ADD_TOKEN",
      payload: token,
    };
  };

  export const removeUsers = () => {
    return {
      type: "REMOVE_USERS"
    };
  };


  
export const isLogged = (condition) => {
    return {
      type: "LOGGED_IN",
      payload: condition,
    };
  };
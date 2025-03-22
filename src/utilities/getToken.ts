const getToken = () => {
  const token = sessionStorage.getItem("token");

  return token;
};

export default getToken;

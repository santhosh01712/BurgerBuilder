import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-d0e0e-default-rtdb.firebaseio.com/",
});

export default instance;

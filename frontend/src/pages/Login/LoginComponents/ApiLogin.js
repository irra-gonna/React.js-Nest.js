import axios from "axios";

function getUsers() {}
function getUserById() {}

function postUser() {}

const postUserLogin = async (email, password) => {
  const fd = new URLSearchParams();
  fd.append("email", email);
  fd.append("password", password);

  try {
    await axios.post("http://localhost:5000/User/login", fd, {
      withCredentials: true,
      
    });
    console.log("hello");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.error) {
        throw new Error(error.response?.data.error);
      }
    }
  }
};

export { getUserById, getUsers, postUser, postUserLogin };

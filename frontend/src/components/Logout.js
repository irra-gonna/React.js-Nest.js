import Cookies from 'js-cookie';

const Logout = () => {
  Cookies.remove("jwtToken");
  window.location.href = '/login';
};

export default Logout;

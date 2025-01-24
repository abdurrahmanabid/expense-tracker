const getUserId = () => {
  const id = document.cookie.replace(
    /(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return id;
};
export default getUserId;

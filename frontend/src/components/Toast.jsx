const Toast = ({ message, type = "success" }) => {
  return (
    <div
      className={`fixed top-5 right-5 px-5 py-3 rounded-xl text-white shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
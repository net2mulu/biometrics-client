const ToggleButton = ({ toggle, onchange }) => {
  return (
    <button
      onClick={onchange}
      className={
        toggle
          ? "rounded-md scale-90 relative bg-green40 transition duration-200 text-[#6a6a6a] w-16 p-0.5"
          : "rounded-md scale-90 relative bg-N90 transition duration-200 text-[#6a6a6a] w-16 p-0.5"
      }
    >
      <p
        className={
          toggle
            ? "p-1 translate-x-[1.9rem] bg-white rounded-md w-min text-sm uppercase transition duration-200 ease-in-out"
            : "p-1  bg-white rounded-md w-min text-sm uppercase transition duration-200 ease-in-out"
        }
      >
        {toggle ? "on" : "off"}
      </p>
    </button>
  );
};

export default ToggleButton;

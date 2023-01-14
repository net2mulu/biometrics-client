const Button = ({ children, custom, onClick, disabled, type }) => {
    return (
      <button
      type={type}
        disabled={disabled}
        className={`${custom} px-4 sm:px-6 rounded-sm shadow-sm capitalize transition-all duration-200 ease-in-out`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  
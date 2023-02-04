import Lottie from "react-lottie-player";

const VerifiedLotty = ({ lotty, width }) => {
  return (
    <Lottie
      loop
      animationData={lotty}
      play
      style={{ width: width }}
    />
  );
};

export default VerifiedLotty;

import IrisLayout from "../../../components/Iris/IrisLayout";
import IrisControls from "../../../components/Iris/IrisScan/IrisControls";
import IrisStream from "../../../components/Iris/IrisScan/IrisStream";

const IrisScan = () => {
  return (
    <IrisLayout>
      <IrisStream />
      <IrisControls />
    </IrisLayout>
  );
};

export default IrisScan;

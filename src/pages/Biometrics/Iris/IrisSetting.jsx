import React from "react";
import IrisLayout from "../../../components/Iris/IrisLayout";
import IrisGuide from "../../../components/Iris/IrisSetting/IrisGuide";
import IrisToggle from "../../../components/Iris/IrisSetting/IrisToggle";

const IrisSetting = () => {
  return (
    <IrisLayout>
      <IrisToggle />
      <IrisGuide />
    </IrisLayout>
  );
};

export default IrisSetting;

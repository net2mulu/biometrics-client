import React, { useState, createContext, useEffect, useRef } from "react";
const CameraContext = createContext();
export const CameraProvider = ({ children }) => {
  //devices to enumrate
  const [devices, setDevices] = useState([]);
  const [SelectedDevice, setSelectedDevice] = useState({});

  const [currentStream, setCurrentSream] = useState();

  //capture mode
  const [captureMode, setCaptureMode] = useState("front");
  //cam width and heignt
  const [feedHeight, setFeedHeight] = useState();
  const [feedWidth, setFeedWidth] = useState();
  //faces
  const [frontFace, setFrontFace] = useState();
  const [leftFace, setLeftFace] = useState();
  const [rightFace, setRightFace] = useState();

  const [faceVerificationFilterData, setFaceVerificationFilterData] = useState({
    region: null,
    gender: null,
  });

  const imageRef = useRef(null);
  const feedRef = useRef(null);

  //a function to stop all streams
  const stopMediaTracks = (stream) => {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  };

  //a function used to enumrate and populate device list
  const gotDevices = (mediaDevices) => {
    let count = 1;
    let deviceList = [];
    mediaDevices.forEach((mediaDevice) => {
      if (mediaDevice.kind === "videoinput") {
        deviceList.push({
          label: mediaDevice.label || `Camera ${count++}`,
          id: mediaDevice.deviceId,
        });
      }
      setDevices(deviceList);
    });
  };

  const getCameras = () => {
    if (typeof currentStream !== "undefined") {
      stopMediaTracks(currentStream);
    }
    const videoConstraints = {
      width: { min: 1024, ideal: 1920, max: 3450 },
      height: { min: 576, ideal: 1080, max: 2600 },
    };
    if (SelectedDevice === null) {
      videoConstraints.facingMode = "environment";
    } else {
      videoConstraints.deviceId = { exact: SelectedDevice.id };
    }
    const constraints = {
      video: videoConstraints,
      audio: false,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setCurrentSream(stream);
        let vid = feedRef.current;
        vid.srcObject = stream;
        setFeedWidth(stream.getTracks()[0].getSettings().width);
        setFeedHeight(stream.getTracks()[0].getSettings().height);
        vid.play();
        return navigator.mediaDevices.enumerateDevices();
      })
      .then(gotDevices)
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // navigator.mediaDevices.enumerateDevices().then(getCameras);
    getCameras();
    // eslint-disable-next-line
  }, [SelectedDevice]);

  const takePicture = () => {
    let video = feedRef.current;
    let photo = imageRef.current;

    photo.getContext("2d").drawImage(video, 0, 0, photo.width, photo.height);
    let image_data_url = photo.toDataURL();
    console.log(image_data_url);
    // data url of the image
    if (captureMode === "left") {
      setLeftFace(image_data_url);
    } else if (captureMode === "right") {
      setRightFace(image_data_url);
    } else if (captureMode === "front") {
      setFrontFace(image_data_url);
    }
  };

  const clearImage = () => {
    let photo = imageRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
  };

  return (
    <CameraContext.Provider
      value={{
        clearImage,
        takePicture,
        setCaptureMode,
        setSelectedDevice,
        setLeftFace,
        setRightFace,
        setFrontFace,
        stopMediaTracks,
        setFaceVerificationFilterData,
        faceVerificationFilterData,
        currentStream,
        imageRef,
        feedRef,
        captureMode,
        feedHeight,
        feedWidth,
        frontFace,
        leftFace,
        rightFace,
        devices,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

export default CameraContext;

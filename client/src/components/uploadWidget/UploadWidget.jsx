import { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setState }) {
  const [loaded, setLoaded] = useState(false);
  const [cloudinary, setCloudinary] = useState(null);
  const [myWidget, setMyWidget] = useState(null);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () =>{
          setLoaded(true);
          setCloudinary(window.cloudinary);
      });
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
        setCloudinary(window.cloudinary);
      }
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded && cloudinary && !myWidget) {
      const widget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setState(prev => [...prev, result.info.secure_url]);
          }
        }
      );
      setMyWidget(widget);
    }
  }, [loaded, cloudinary, uwConfig, setState, myWidget]);

  const handleButtonClick = () => {
    if (myWidget) {
      myWidget.open();
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={handleButtonClick}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
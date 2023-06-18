
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar } from "react-bootstrap";
function Progressb() {
    const [progress, setProgress] = useState(0);

    const handleProgress = (newProgress) => {
      setProgress(newProgress);
    };
  
    return (
      <div className="w-50 mt-3 p-2">
        <ProgressBar variant="success" now={progress} />
        <div className="mt-3 d-flex justify-content-start">
        <button className="btn btn-primary " onClick={() => handleProgress(0)}>
           Reset
          </button>
          <button className="btn btn-primary ms-2" onClick={() => handleProgress(25)}>
            Stage 1
          </button>
          <button className="btn btn-primary ms-2" onClick={() => handleProgress(50)}>
            Stage 2
          </button>
          <button className="btn btn-primary ms-2" onClick={() => handleProgress(75)}>
            Stage 3
          </button>
          <button className="btn btn-primary ms-2" onClick={() => handleProgress(100)}>
            Stage 4
          </button>
        </div>
      </div>
    );
  }

export default Progressb;



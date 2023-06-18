
import React from "react";
import { MDBContainer } from "mdbreact";
import { Doughnut } from "react-chartjs-2";
    
const Dough = () => {
    
  // Sample data
  const data = {
    labels: ["Java", "Javascript", "React"],
      datasets: [
        {
          label: "Programming Language used",
          data: [16, 68, 32],
          backgroundColor: ["blue", "red", "green", "orange"],
        }
      ]
  }

  return (
    <MDBContainer>
      <Doughnut data={data} />
    </MDBContainer>
  );
}
    
export default Dough;
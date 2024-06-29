import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div className="container text-center">
      <img src={loading} alt="Loading..." />
    </div>
  );
};

export default Spinner;

// Class Based Components

// import React, { Component } from 'react'
// import loading from "./loading.gif"

// export class Spinner extends Component {
//   render() {
//     return (
//       <div className="container text-center">
//         <img src={loading} alt="Loading..." />
//       </div>
//     )
//   }
// }

// export default Spinner

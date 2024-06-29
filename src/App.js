import "./App.css";
import LoadingBar from "react-top-loading-bar";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [progress, setProgress] = useState(0);

  const pageSize = 12;
  const apiKey = process.env.REACT_APP_NEWS_API;

  return (
    <div>
      <Router>
        <LoadingBar color="white" progress={progress} />
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                pageProgress={setProgress}
                apiKey={apiKey}
                key="general"
                country="in"
                pageSize={pageSize}
                category="general"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                pageProgress={setProgress}
                apiKey={apiKey}
                key="business"
                country="in"
                pageSize={pageSize}
                category="business"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                pageProgress={setProgress}
                apiKey={apiKey}
                key="entertainment"
                country="in"
                pageSize={pageSize}
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                pageProgress={setProgress}
                apiKey={apiKey}
                key="health"
                country="in"
                pageSize={pageSize}
                category="health"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                pageProgress={setProgress}
                apiKey={apiKey}
                key="science"
                country="in"
                pageSize={pageSize}
                category="science"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                pageProgress={setProgress}
                apiKey={apiKey}
                key="sports"
                country="in"
                pageSize={pageSize}
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                pageProgress={setProgress}
                apiKey={apiKey}
                key="technology"
                country="in"
                pageSize={pageSize}
                category="technology"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

// Class Based Components

// import "./App.css";
// import LoadingBar from "react-top-loading-bar";
// import React, { Component } from "react";
// import Navbar from "./components/Navbar";
// import News from "./components/News";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// export default class App extends Component {
//   // c = "Harsh";

//   state = {
//     progress: 0
//   };

//   setProgress = (progress) => {
//     setState({progress: progress});
//   };

//   pageSize = 12;
//   apiKey = process.env.REACT_APP_NEWS_API;

//   render() {
//     // return <div>{Hello World! This is new class based component {c}}</div>;
//     return (
//       <div>
//         <Router>
//           <LoadingBar
//             color="white"
//             progress={progress}
//           />
//           <Navbar />
//           <Routes>
//             <Route
//               exact
//               path="/"
//               element={
//                 <News
//                   pageProgress={setProgress}
//                   apiKey={apiKey}
//                   key="general"
//                   country="in"
//                   pageSize={pageSize}
//                   category="general"
//                 />
//               }
//             />
//             <Route
//               exact
//               path="/business"
//               element={
//                 <News
//                   pageProgress={setProgress}
//                   apiKey={apiKey}
//                   key="business"
//                   country="in"
//                   pageSize={pageSize}
//                   category="business"
//                 />
//               }
//             />
//             <Route
//               exact
//               path="/entertainment"
//               element={
//                 <News
//                   pageProgress={setProgress}
//                   apiKey={apiKey}
//                   key="entertainment"
//                   country="in"
//                   pageSize={pageSize}
//                   category="entertainment"
//                 />
//               }
//             />
//             <Route
//               exact
//               path="/health"
//               element={
//                 <News
//                   pageProgress={setProgress}
//                   apiKey={apiKey}
//                   key="health"
//                   country="in"
//                   pageSize={pageSize}
//                   category="health"
//                 />
//               }
//             />
//             <Route
//               exact
//               path="/science"
//               element={
//                 <News
//                   pageProgress={setProgress}
//                   apiKey={apiKey}
//                   key="science"
//                   country="in"
//                   pageSize={pageSize}
//                   category="science"
//                 />
//               }
//             />
//             <Route
//               exact
//               path="/sports"
//               element={
//                 <News
//                   pageProgress={setProgress}
//                   apiKey={apiKey}
//                   key="sports"
//                   country="in"
//                   pageSize={pageSize}
//                   category="sports"
//                 />
//               }
//             />
//             <Route
//               exact
//               path="/technology"
//               element={
//                 <News
//                   pageProgress={setProgress}
//                   apiKey={apiKey}
//                   key="technology"
//                   country="in"
//                   pageSize={pageSize}
//                   category="technology"
//                 />
//               }
//             />
//           </Routes>
//         </Router>
//       </div>
//     );
//   }
// }

import React from "react";
import loading from "./loading.gif";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div>
      <div className="card">
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-success"
          style={{ left: "90%", zIndex: "1" }}
        >
          {source}
        </span>
        <img
          src={imageUrl ? imageUrl : loading}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            News Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;

// Class Based Components

// import React, { Component } from "react";
// import loading from "./loading.gif";

// export class NewsItem extends Component {
//   // constructor() {
//   //     super();
//   //     console.log("I am a NewsItem Constructor");
//   // }

//   render() {
//     let { title, description, imageUrl, newsUrl, author, date, source } =
//       this.props;
//     return (
//       <div>
//         <div className="card">
//           <span
//             className="position-absolute top-0 translate-middle badge rounded-pill bg-success"
//             style={{ left: "90%", zIndex: "1" }}
//           >
//             {source}
//           </span>
//           <img
//             src={imageUrl ? imageUrl : loading}
//             className="card-img-top"
//             alt="..."
//           />
//           <div className="card-body">
//             <h5 className="card-title">{title}</h5>
//             <p className="card-text">{description}</p>
//             <p className="card-text">
//               <small className="text-body-secondary">
//                 By {author?author:"Unknown"} on {new Date(date).toGMTString()}
//               </small>
//             </p>
//             <a
//               rel="noreferrer"
//               href={newsUrl}
//               target="_blank"
//               className="btn btn-sm btn-dark"
//             >
//               News Details
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default NewsItem;

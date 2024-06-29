import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [newsArticles, setnewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // FETCHING DATA USING API

  const updatePage = async () => {
    // setLoading(true);
    props.pageProgress(10);
    const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(URL);
    props.pageProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    props.pageProgress(70);
    setnewsArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    props.pageProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updatePage();
    // eslint-disable-next-line
  }, []);

  // const handlePrevPage = async () => {
  //
  //   setPage(page - 1);
  //   updatePage();
  // };

  // const handleNextPage = async () => {
  //    setPage(Page+1);
  // updatePage();
  // };

  const fetchMoreData = async () => {
    // setPage(page + 1);
    // const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    const URL = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1); // THIS WILL RESOLVE THE ISSUE OF FETCHING SAME DATA
    let data = await fetch(URL);
    let parsedData = await data.json();
    console.log(parsedData);
    setnewsArticles(newsArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ marginTop: "85px", marginBottom: "25px" }}
      >
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={newsArticles.length}
        next={fetchMoreData}
        hasMore={totalResults >= newsArticles.length}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-2">
            {!loading &&
              newsArticles.map((element) => {
                return (
                  <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevPage}
          >
            &larr; Prev
          </button>
          <button
            disabled={
              page + 1 > Math.ceil(totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextPage}
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 12,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

// // Class Based Components

// import React, { Component } from "react";
// import NewsItem from "./NewsItem";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
//   // Local Json
//   //   articles = [
//   //     {
//   //       source: {
//   //         id: "business-insider-uk",
//   //         name: "Business Insider (UK)",
//   //       },
//   //       author: "Matthew Loh",
//   //       title:
//   //         "Taiwan says China is still sending 'cognitive warfare' balloons to the island",
//   //       description:
//   //         "Taiwan said another six balloons entered its airspace on Sunday, with one crossing over the island's south as PLA vessels and aircraft approached.",
//   //       url: "http://uk.businessinsider.com/china-cognitive-warfare-balloon-taiwan-defense-ministry-2024-1",
//   //       urlToImage:
//   //         "https://i.insider.com/65b2227943bb77284ba07607?width=1200&format=jpeg",
//   //       publishedAt: "2024-01-26T07:04:54Z",
//   //       content:
//   //         "China isn't letting up on its deluge of balloons on Taiwan, sending over another six high-altitude balloons on Sunday, according to the island's defense ministry.\r\nThe six balloons passed through Tai… [+1786 chars]",
//   //     },
//   //     {
//   //       source: { id: "ars-technica", name: "Ars Technica" },
//   //       author: "John Timmer",
//   //       title:
//   //         "LIGO goes to space: ESA to proceed with LISA gravitational wave detector",
//   //       description:
//   //         "A gravitational wave detector in space will be sensitive to unexplored phenomena.",
//   //       url: "https://arstechnica.com/space/2024/01/esa-approves-a-search-for-the-gravitational-echoes-of-the-big-bang/",
//   //       urlToImage:
//   //         "https://cdn.arstechnica.net/wp-content/uploads/2024/01/image-11-760x380.jpeg",
//   //       publishedAt: "2024-01-25T22:21:03+00:00",
//   //       content:
//   //         "Enlarge/ The LISA project will consist of three spacecraft in a triangular configuration, exchanging lasers.\r\n68\r\nOn Thursday, the European Space Agency's Science Programme Committee gave the go-ahea… [+3739 chars]",
//   //     },
//   //     {
//   //       source: { id: "techcrunch", name: "TechCrunch" },
//   //       author: "Aria Alamalhodaei",
//   //       title:
//   //         "Japan's SLIM spacecraft sticks moon landing – upside-down | TechCrunch",
//   //       description:
//   //         "The Japan Aerospace Exploration Company shared the first image of its lander on the lunar surface, revealing that the spacecraft touched down on the moon",
//   //       url: "https://techcrunch.com/2024/01/25/japans-slim-spacecraft-sticks-moon-landing-upside-down/",
//   //       urlToImage:
//   //         "https://techcrunch.com/wp-content/uploads/2024/01/jaxa-slim-landing.jpeg?w=640",
//   //       publishedAt: "2024-01-25T21:11:23Z",
//   //       content:
//   //         "The Japan Aerospace Exploration Company shared the first image of its lander on the lunar surface, revealing that the spacecraft touched down on the moon upside-down.\r\nIts a remarkable recovery for t… [+1888 chars]",
//   //     },
//   //     {
//   //       source: { id: "ars-technica", name: "Ars Technica" },
//   //       author: "Stephen Clark",
//   //       title:
//   //         "A Japanese spacecraft faceplanted on the Moon and lived to tell the tale",
//   //       description:
//   //         "Despite engine failure, SLIM managed to achieve the most precise Moon landing ever.",
//   //       url: "https://arstechnica.com/space/2024/01/a-japanese-spacecraft-faceplanted-on-the-moon-and-lived-to-tell-the-tale/",
//   //       urlToImage:
//   //         "https://cdn.arstechnica.net/wp-content/uploads/2024/01/20240125-4_01-2-640x380.jpg",
//   //       publishedAt: "2024-01-25T17:55:40+00:00",
//   //       content:
//   //         "Japan's SLIM spacecraft is seen nose down on the surface of the Moon.\r\n111\r\nJapan's first lunar lander made an unsteady touchdown on the Moon last week, moments after one of its two main engines inex… [+4733 chars]",
//   //     },
//   //     {
//   //       source: { id: "engadget", name: "Engadget" },
//   //       author: "Sarah Fielding",
//   //       title: "Microsoft launches Mesh, a virtual meeting platform on Teams",
//   //       description:
//   //         "It brings employees' avatars together in a customized space.",
//   //       url: "https://www.engadget.com/microsoft-launches-mesh-a-virtual-meeting-platform-on-teams-095018763.html",
//   //       urlToImage:
//   //         "https://s.yimg.com/os/creatr-uploaded-images/2024-01/d6537af0-bb5a-11ee-96ff-bbf82f40e895",
//   //       publishedAt: "2024-01-25T09:50:18Z",
//   //       content:
//   //         'While many organizations are pushing for their employees to return to offices, Microsoft suggests trying a new type of "hybrid" working. The company has announced the launch of Microsoft Mesh, a feat… [+1566 chars]',
//   //     },
//   //     {
//   //       source: { id: "next-big-future", name: "Next Big Future" },
//   //       author: "Brian Wang",
//   //       title:
//   //         "IVO, NASA, DARPA and Another Group Are All Working to Test Quantum Drive's in Space | NextBigFuture.com",
//   //       description:
//   //         "Here is information of the Quantized inertia drive and experiments. There is information from several of the papers, video discussions and direct",
//   //       url: "https://www.nextbigfuture.com/2024/01/ivo-nasa-darpa-and-another-group-are-all-working-to-test-quantum-drives-in-space.html",
//   //       urlToImage:
//   //         "https://nextbigfuture.s3.amazonaws.com/uploads/2024/01/Screen-Shot-2024-01-24-at-10.47.12-PM-1024x538.jpg",
//   //       publishedAt: "2024-01-25T06:55:08Z",
//   //       content:
//   //         "Here is information of the Quantized inertia drive and experiments. There is information from several of the papers, video discussions and direct communication that I, Brian Wang, had with Mike McCul… [+8386 chars]",
//   //     },
//   //     {
//   //       source: { id: "le-monde", name: "Le Monde" },
//   //       author: "Laetitia Limmois, Olivier Escher and Diana Liu",
//   //       title:
//   //         "Video. Why did astronauts leave poop on the moon, and what can we learn from it?",
//   //       description:
//   //         "Video - Astronauts left a lot behind when they came back from the moon, including their excrement. This may seem trivial, but it raises important questions regarding space missions.",
//   //       url: "https://www.lemonde.fr/en/videos/video/2024/01/21/why-did-astronauts-leave-poop-on-the-moon-and-what-can-we-learn-from-it_6453711_108.html",
//   //       urlToImage:
//   //         "https://img.lemde.fr/2023/11/30/603/0/2349/1566/1440/960/60/0/3199f37_1701364577506-jettison.jpg",
//   //       publishedAt: "2024-01-21T19:30:22Z",
//   //       content:
//   //         "In six expeditions to the moon, humans have left behind all kinds of waste, including equipment, a now-legendary flag... and 96 bags containing feces, vomit and urine. This fact raises several key qu… [+1127 chars]",
//   //     },
//   //     {
//   //       source: { id: "the-next-web", name: "The Next Web" },
//   //       author: "Linnea Ahlgren",
//   //       title: "3D-printed rocket engine revs up for orbital launch in Scotland",
//   //       description:
//   //         "Edinburgh-based aerospace startup Skyrora announced yesterday it had commenced a series of full-duration tests of its updated 3D-printed 70kN engine. \r\n\r\nThe new design features an ...",
//   //       url: "http://thenextweb.com/news/3d-printed-rocket-engine-revs-up-orbital-launch-scotland",
//   //       urlToImage:
//   //         "https://img-cdn.tnwcdn.com/image/tnw-blurple?filter_last=1&fit=1280%2C640&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2023%2F06%2F70-kn-engine-1-1-1024x576-1-e1687258568667.jpg&signature=e504e335f8babf0e24721de9198d4fb6",
//   //       publishedAt: "2023-06-20T12:00:47Z",
//   //       content:
//   //         "Edinburgh-based aerospace startup Skyrora announced yesterday it had commenced a series of full-duration tests of its updated 3D-printed 70kN engine. \r\nThe new design features an improved engine cool… [+3908 chars]",
//   //     },
//   //     {
//   //       source: { id: "new-scientist", name: "New Scientist" },
//   //       author: null,
//   //       title:
//   //         "SpaceX launches Starlink V2 satellites to increase internet capacity",
//   //       description:
//   //         "A new generation of Starlink’s internet satellites will orbit at low altitudes and eventually re-enter Earth’s atmosphere, limiting the amount of clutter in orbit",
//   //       url: "https://www.newscientist.com/article/2361798-spacex-launches-starlink-v2-satellites-to-increase-internet-capacity/",
//   //       urlToImage:
//   //         "https://images.newscientist.com/wp-content/uploads/2023/02/28135738/SEI_146185094.jpg",
//   //       publishedAt: "2023-02-28T00:00:00Z",
//   //       content:
//   //         "By Chris Stokel-Walker\r\nThe Starlink launch at Cape Canaveral, Florida, on 27 February 2023\r\nSpaceX\r\nA rocket carrying 21 new generation Starlink satellites successfully launched into orbit at 6:13pm… [+2305 chars]",
//   //     },
//   //     {
//   //       source: { id: "national-geographic", name: "National Geographic" },
//   //       author: "Nadia Drake",
//   //       title: "How these feuding map-makers shaped our fascination with Mars",
//   //       description:
//   //         "One was an artist who loved space. His rival was a bold professional astronomer. Their race to map the red planet sparked decades of science and speculation.",
//   //       url: "https://www.nationalgeographic.com/science/2021/02/how-feuding-map-makers-shaped-our-fascination-with-mars.html",
//   //       urlToImage:
//   //         "https://pmdvod.nationalgeographic.com/NG_Video/788/579/smpost_1612381336455.jpg",
//   //       publishedAt: "2021-02-17T14:37:21.3706142Z",
//   //       content: null,
//   //     },
//   //   ];

//   static defaultProps = {
//     country: "in",
//     pageSize: 12,
//     category: "general",
//   };

//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   };

//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   constructor(props) {
//     super(props);
//     // console.log("News Component Constructer Here");
//     this.state = {
//       newsArticles: [],
//       loading: true,
//       page: 1,
//       totalResults: 0,
//     };
//     document.title = `${this.capitalizeFirstLetter(
//       this.props.category
//     )} - NewsMonkey`;
//   }

//   // FETCHING DATA USING API

//   async updatePage() {
//     // this.setState({ loading: true });
//     this.props.pageProgress(10);
//     const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     let data = await fetch(URL);
//     this.props.pageProgress(30);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.props.pageProgress(70);
//     this.setState({
//       newsArticles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false,
//     });
//     this.props.pageProgress(100);
//   }

//   async componentDidMount() {
//     // console.log("I am CDM");
//     // let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
//     // let data = await fetch(URL);
//     // let parsedData = await data.json();
//     // console.log(parsedData);
//     // this.setState({
//     //   newsArticles: parsedData.articles,
//     //   totalResults: parsedData.totalResults,
//     //   loading: false,
//     // });
//     this.updatePage();
//   }

//   // handlePrevPage = async () => {
//   //   // console.log("Prev page");
//   //   // this.setState({ loading: true });
//   //   // let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
//   //   //   this.state.page - 1
//   //   // }&pageSize=${this.props.pageSize}`;
//   //   // let data = await fetch(URL);
//   //   // let parsedData = await data.json();
//   //   // this.setState({
//   //   //   page: this.state.page - 1,
//   //   //   newsArticles: parsedData.articles,
//   //   //   loading: false,
//   //   // });
//   //   this.setState({
//   //     page: this.state.page - 1,
//   //   });
//   //   this.updatePage();
//   // };

//   // handleNextPage = async () => {
//   //   // console.log("Next Page");
//   //   if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
//   //     //   this.setState({ loading: true });
//   //     //   let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
//   //     //     this.state.page + 1
//   //     //   }&pageSize=${this.props.pageSize}`;
//   //     //   let data = await fetch(URL);
//   //     //   let parsedData = await data.json();
//   //     //   this.setState({
//   //     //     page: this.state.page + 1,
//   //     //     newsArticles: parsedData.articles,
//   //     //     loading: false,
//   //     //   });
//   //     this.setState({
//   //       page: this.state.page + 1,
//   //     });
//   //     this.updatePage();
//   //     console.log(this.state.page);
//   //   }
//   // };

//   fetchMoreData = async () => {
//     this.setState({
//       page: this.state.page + 1,
//     });
//     const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     let data = await fetch(URL);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({
//       newsArticles: this.state.newsArticles.concat(parsedData.articles),
//       totalResults: parsedData.totalResults,
//     });
//   };

//   render() {
//     return (
//       <>
//         <h1 className="text-center my-4">
//           NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
//           Headlines
//         </h1>
//         {/* {this.state.loading && <Spinner />} */}
//         <InfiniteScroll
//           dataLength={this.state.newsArticles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.totalResults >= this.state.newsArticles.length}
//           loader={<Spinner />}
//         >
//           <div className="container">
//             <div className="row my-2">
//               {
//                 /*!this.state.loading &&*/
//                 this.state.newsArticles.map((element) => {
//                   return (
//                     <div className="col-md-4 my-2" key={element.url}>
//                       <NewsItem
//                         title={element.title ? element.title.slice(0, 45) : ""}
//                         description={
//                           element.description
//                             ? element.description.slice(0, 88)
//                             : ""
//                         }
//                         imageUrl={element.urlToImage}
//                         newsUrl={element.url}
//                         author={element.author}
//                         date={element.publishedAt}
//                         source={element.source.name}
//                       />
//                     </div>
//                   );
//                 })
//               }
//             </div>
//           </div>
//         </InfiniteScroll>
//         {/* <div className="container d-flex justify-content-between">
//           <button
//             disabled={this.state.page <= 1}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handlePrevPage}
//           >
//             &larr; Prev
//           </button>
//           <button
//             disabled={
//               this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
//             }
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handleNextPage}
//           >
//             Next &rarr;
//           </button>
//         </div> */}
//       </>
//     );
//   }
// }

// export default News;

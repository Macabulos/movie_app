// import React, { useEffect, useRef } from 'react';
// import './cards.css';
// import video_data from '../../assets/video/video';

// const Card_video = ({ title, category }) => {
//   const cardsRef = useRef();

//   const handleWheel = (event) => {
//     event.preventDefault();
//     cardsRef.current.scrollLeft += event.deltaY;
//   };

//   useEffect(() => {
//     cardsRef.current.addEventListener('wheel', handleWheel);
//     return () => {
//       cardsRef.current.removeEventListener('wheel', handleWheel);
//     };
//   }, []);

//   return (
//     <div className="cards">
//       <h2>{title ? title : 'Popular on Netflex'}</h2>
//       <div className="card-list" ref={cardsRef}>
//         {video_data.map((video, index) => (
//           <div className="video" key={index}>
//             <video
//               src={video.video} // Change this to the correct property for your video source
//               controls
//               muted
//               loop
//               className="video-card"
//             />
//             <p>{video.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Card_video;

// import PropTypes from 'prop-types';

// BusStopModal.propTypes = {
//   isOpen: PropTypes.bool,
//   onClose: PropTypes.func,
//   station: PropTypes.object,
//   afiliateRoutes: PropTypes.array,
//   onRouteSelected: PropTypes.func,
// };

// function BusStopModal({
//   isOpen,
//   onClose,
//   station,
//   afiliateRoutes,
//   onRouteSelected,
// }) {
//   const handleClose = e => {
//     if (e.target.id === 'modal-overlay') {
//       console.log(e.target);
//       onClose();
//     }
//   };

//   return (
//     <>
//       {isOpen && (
//         <div
//           id="modal-overlay"
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//           onClick={handleClose}
//         >
//           <div
//             className="relative bg-white rounded-lg shadow-2xl p-6
//                        w-full max-w-md md:max-w-lg lg:max-w-xl
//                        sm:w-11/12 sm:mx-4 md:w-auto animate-fade-in m-3"
//           >
//             <button
//               className="absolute top-4 right-4 text-gray-700 text-2xl font-bold hover:text-gray-900 transition-all"
//               onClick={onClose}
//               aria-label="Close modal"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
//               {station?.stop_name || 'Bus Stop'}
//             </h2>
//             <div className="max-h-80 overflow-y-auto space-y-3">
//               {afiliateRoutes.length > 0 ? (
//                 afiliateRoutes.map(({ route, trip }) => (
//                   <div
//                     key={trip.trip_id}
//                     className="flex items-center p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-all"
//                     onClick={() =>
//                       onRouteSelected(route.route_id, trip.direction_id)
//                     }
//                   >
//                     <div
//                       className="h-10 w-10 flex items-center justify-center
//                                  bg-blue-500 text-white font-bold rounded-full mr-4"
//                     >
//                       {route.route_short_name}
//                     </div>
//                     <div>
//                       <p className="text-gray-700 font-medium">
//                         {route.route_long_name}
//                       </p>
//                       <p className="text-gray-500 text-sm">
//                         {trip.trip_headsign || 'No destination info'}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 text-center">
//                   No routes available.
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default BusStopModal;

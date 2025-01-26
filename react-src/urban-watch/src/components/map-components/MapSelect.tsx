import VehicleRepository from '../../repositories/VehicleRepository';
import RoutesData from '../../data/Routes';
import { RouteDTO, TripDTO } from '../../dto/TranzyDTOs';

const vehicleRepository = new VehicleRepository(false);

function MapSelect({
  route,
  tripDirection,
  tripsOnRoute,
  dispatchHelper,
}: {
  route: RouteDTO;
  tripDirection: number;
  tripsOnRoute: TripDTO[];
  dispatchHelper: unknown;
}) {
  return (
    <div className="absolute z-10 flex flex-wrap sm:flex-nowrap flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gray-100 shadow w-full">
      <select
        className="p-2 rounded border border-gray-300 bg-white w-full flex-grow"
        value={route.route_id}
        onChange={e => {
          dispatchHelper.setRoute(e.target.value);
        }}
      >
        {RoutesData.map(r => (
          <option key={r.route_id} value={r.route_id}>
            {vehicleRepository.GetVehicleType(r.route_type)}{' '}
            {r.route_short_name}:{r.route_long_name}
          </option>
        ))}
      </select>
      <select
        className="p-2 rounded border border-gray-300 bg-white w-full flex-grow"
        value={tripDirection}
        onChange={e => dispatchHelper.setDirection(e.target.value)}
      >
        {tripsOnRoute.map(t => (
          <option key={t.trip_id} value={t.direction_id}>
            to {t.trip_headsign}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MapSelect;

import React, { memo } from "react";
import Location from "../../components/map/Location";

const MapPage = memo(() => {
  return (
    <div>
      <Location />
    </div>
  );
});

export default MapPage;

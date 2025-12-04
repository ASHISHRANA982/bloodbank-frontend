import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFacilities, deleteFacility } from "../../api-redux/bloodbankRedux/stockFacilitySlice";

import "./bloodbankFacility.css";

const FacilityComponent = () => {
  const dispatch = useDispatch();
  const { facilities, loading, message } = useSelector((state) => state.stockFacility);

  useEffect(() => {
    dispatch(getFacilities());
  }, [dispatch, message]);

  return (
    <div className="facility-container">
      <h2 className="facility-title">Facilities Available</h2>

      {loading && <p className="info-text">Loading facilities...</p>}

      {/* Facilities List */}
      <div className="facility-list">
        {facilities.map((f) => (
          <div key={f.id} className="facility-card">
            <div className="facility-name">{f.facilityName}</div>

            <button
              className="facility-delete-btn"
              onClick={() => dispatch(deleteFacility(f.id))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {message && <p className="success-text">{message}</p>}
    </div>
  );
};

export default FacilityComponent;

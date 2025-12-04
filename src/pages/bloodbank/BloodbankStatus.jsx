import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getBloodBankStatus,
  cancelRequest,
  acceptRequest,
} from "../../api-redux/bloodbankRedux/bloodBankProfileSlice";

import "./bloodbankStatus.css";

const BloodBankStatusPage = () => {
  const dispatch = useDispatch();
  const {
    statusList = [],
    statusLoading,
    statusError,
    actionLoading,
    actionError,
    actionMessage
  } = useSelector((state) => state.bloodBankProfile);

  const [filter, setFilter] = useState("PENDING");

  useEffect(() => {
    dispatch(getBloodBankStatus());
  }, [dispatch]);

  const filteredList = statusList.filter(
    (s) => (s.availability || "").toUpperCase() === filter
  );

  const handleCancel = (id) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    dispatch(cancelRequest(id));
  };

  const handleAccept = (s) => {
    const bloodId =
      s.bloodbankId ?? s.bloodInventoryId ?? s.orderBloodId;
    if (!bloodId) {
      alert("Cannot accept: missing bloodId in record.");
      return;
    }
    dispatch(acceptRequest({ bsId: s.id, bloodId }));
  };

  return (
    <div className="status-container">
      <h2 className="status-title">Blood Bank Status</h2>

      {/* Filter Buttons */}
      <div className="status-filter">
        <button
          className={filter === "PENDING" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("PENDING")}
        >
          Pending ({statusList.filter((s) => (s.availability || "").toUpperCase() === "PENDING").length})
        </button>

        <button
          className={filter === "ACCEPTED" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("ACCEPTED")}
        >
          Accepted ({statusList.filter((s) => (s.availability || "").toUpperCase() === "ACCEPTED").length})
        </button>
      </div>

      {/* Loading / Error */}
      {statusLoading && <p className="info-text">Loading status...</p>}
      {statusError && (
        <p className="error-text">
          {typeof statusError === "string" ? statusError : JSON.stringify(statusError)}
        </p>
      )}

      {/* No Data */}
      {!statusLoading && filteredList.length === 0 && (
        <p className="info-text">No {filter.toLowerCase()} requests.</p>
      )}

      {/* Status Cards */}
      <div className="status-list">
        {filteredList.map((s) => (
          <div
            key={s.id}
            className={
              s.availability === "PENDING"
                ? "status-card pending"
                : "status-card accepted"
            }
          >
            <div className="status-row"><strong>Recipient:</strong> {s.recipientName}</div>
            <div className="status-row"><strong>Order Quantity:</strong> {s.orderQuantity}</div>
            <div className="status-row"><strong>Blood Type:</strong> {s.bloodType}</div>
            <div className="status-row"><strong>Blood Group:</strong> {s.bloodGroup}</div>
            <div className="status-row"><strong>Distance:</strong> {s.distance} km</div>
            <div className="status-row"><strong>Location:</strong> {s.location}</div>
            <div className="status-row"><strong>Donation Date:</strong> {s.donationDate}</div>
            <div className="status-row"><strong>Phone:</strong> {s.phoneNo}</div>
            <div className="status-row"><strong>Status:</strong> {s.availability}</div>

            {/* Buttons */}
            {s.availability === "PENDING" && (
              <div className="status-actions">
                <button className="cancel-btn" onClick={() => handleCancel(s.id)}>
                  Cancel
                </button>
                <button className="accept-btn" onClick={() => handleAccept(s)}>
                  Accept
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {actionLoading && <p className="info-text">Processing...</p>}
      {actionError && <p className="error-text">{actionError}</p>}
      {actionMessage && <p className="success-text">{actionMessage}</p>}
    </div>
  );
};

export default BloodBankStatusPage;

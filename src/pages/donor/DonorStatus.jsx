import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatus, updateDonorStatus, cancelRequest } from "../../api-redux/donorRedux/profileSlice";
import "./DonorStatus.css";

const DonorStatus = () => {
  const dispatch = useDispatch();

  const { statusList = [], loadingStatus, errorStatus } = useSelector(
    (state) => state.profile
  );

  const [statusType, setStatusType] = useState("PENDING");

  useEffect(() => {
    dispatch(fetchStatus());
  }, [dispatch]);

  const pendingIds = statusList.filter((s) => s.availability === "PENDING");
  const acceptedIds = statusList.filter((s) => s.availability === "ACCEPTED");

  if (loadingStatus)
    return (
      <div className="cs-page-loader">
        <div className="cs-spinner"></div>
      </div>
    );

  if (errorStatus) return <p style={{ color: "red" }}>Error: {errorStatus}</p>;

  const filteredList = statusList.filter(
    (s) => s.availability.toUpperCase() === statusType.toUpperCase()
  );

  const handleCancel = async (id) => {
    await dispatch(cancelRequest(id));
    dispatch(fetchStatus());
  };

  const handleUpdateStatus = async (id) => {
    await dispatch(updateDonorStatus(id));
    dispatch(fetchStatus());
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="cs-wrapper">
      <div className="cs-right">

        {/* Tabs */}
        <div className="cs-tabs">
          <button
            onClick={() => setStatusType("PENDING")}
            className={statusType === "PENDING" ? "cs-tab active" : "cs-tab"}
          >
            Pending ({pendingIds.length})
          </button>

          <button
            onClick={() => setStatusType("ACCEPTED")}
            className={statusType === "ACCEPTED" ? "cs-tab active" : "cs-tab"}
          >
            Accepted ({acceptedIds.length})
          </button>
        </div>

        {/* Empty */}
        {filteredList.length === 0 && (
          <p className="cs-empty">No {statusType} records found.</p>
        )}

        {/* TABLE */}
        {filteredList.length > 0 && (
          <div className="cs-table-container">
            <table className="cs-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Recipient</th>
                  <th>Blood Group</th>
                  <th>Distance</th>
                  <th>Location</th>
                  <th>Phone</th>
                  <th>Status</th>
                  {statusType === "PENDING" && <th>Actions</th>}
                </tr>
              </thead>

              <tbody>
                {filteredList.map((s) => (
                  <tr key={s.id}>
                    <td>{formatDate(s.donationDate)}</td>
                    <td>{s.recipientName}</td>
                    <td>{s.bloodGroup}</td>

                    <td>
                      {s.distance === "0" || s.distance === 0 || !s.distance
                        ? "N/A"
                        : `${s.distance} km`}
                    </td>

                    <td>{s.location}</td>
                    <td>{s.phoneNo}</td>

                    <td>
                      <span className={`cs-status ${s.availability.toLowerCase()}`}>
                        {s.availability}
                      </span>
                    </td>


                    {statusType === "PENDING" && (
                      <td className="cs-actions">
                        <button className="cs-btn cancel" onClick={() => handleCancel(s.id)}>
                          Cancel
                        </button>
                        <button className="cs-btn accept" onClick={() => handleUpdateStatus(s.id)}>
                          Update
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default DonorStatus;

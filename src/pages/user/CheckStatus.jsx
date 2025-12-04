import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkStatus, chooseDelivery } from "../../api-redux/userRedux/matchedSlice";
import "./CheckStatus.css";
import { useLocation } from "react-router-dom";

export default function CheckStatus() {
  const location = useLocation();
  const Ids = location.state;
  const dispatch = useDispatch();

  const { checkStatusResponse } = useSelector((state) => state.matched);

  const intervalRef = useRef(null);

  const donorArr = Ids?.donorStatuses?.map((d) => d.id) || [];
  const bloodbankArr = Ids?.bloodbankStatuses?.map((b) => b.id) || [];

  const allStatusIds = {
    donorStatusIds: donorArr,
    bloodbankStatusIds: bloodbankArr,
  };

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, [Ids]);

  useEffect(() => {
    if (!Ids) return;

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        dispatch(checkStatus(allStatusIds));
      }, 60 * 100);
    }

    return () => clearInterval(intervalRef.current);
  }, [dispatch, Ids]);

  useEffect(() => {
    if (!checkStatusResponse) return;

    const donorAccepted = checkStatusResponse.donorStatuses?.some(
      (d) => d.availability === "ACCEPTED"
    );
    const bankAccepted = checkStatusResponse.bloodbankStatuses?.some(
      (b) => b.availability === "ACCEPTED"
    );

    if (donorAccepted || bankAccepted) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [checkStatusResponse]);

  if (!checkStatusResponse) {
  return (
    <div className="md-loader-wrapper">
      <div className="md-loader"></div>
      <p className="md-loader-text">Checking status...</p>
    </div>
  );
}


  const handleChooseDonor = (id) => {
    dispatch(chooseDelivery({ donorStatusIds: [id], bloodbankStatusIds: [] }))
      .unwrap()
      .then(() => {
        dispatch(checkStatus(allStatusIds));
      });
  };

  const handleChooseBloodbank = (id) => {
    dispatch(chooseDelivery({ donorStatusIds: [], bloodbankStatusIds: [id] }))
      .unwrap()
      .then(() => {
        dispatch(checkStatus(allStatusIds));
      });
  };

  return (
    <main className="md-container">
      <h2 className="md-title">Matched Donors & Blood Banks</h2>
      <button className="back-btn" onClick={() => window.history.back()}>
  ← Back
</button>


      {/* ===================== DONORS TABLE ===================== */}
      <section className="md-section">
        <h3 className="md-subtitle-text">Donors</h3>

        <div className="md-table-container">
          <table className="md-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Distance</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {checkStatusResponse.donorStatuses?.map((d, i) => (
                <tr key={i}>
                  <td>{d.donorRegistration?.name}</td>
                  <td>{d.bloodGroup}</td>
                  <td>{d.distance}</td>
                  <td>{d.donorRegistration?.phone_no}</td>
                  <td className={`status ${d.availability.toLowerCase()}`}>
                    {d.availability}
                  </td>
                  <td>{d.donorRegistration?.address}</td>
                  <td>
                    <button
                      className="md-btn cancel"
                      onClick={() => handleChooseDonor(d.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </section>

      {/* ===================== BLOOD BANKS TABLE ===================== */}
      <section className="md-section">
        <h3 className="md-subtitle-text">Blood Banks</h3>

        <div className="md-table-container">
          <table className="md-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Distance</th>
                <th>Status</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {checkStatusResponse.bloodbankStatuses?.map((b, i) => (
                <tr key={i}>
                  <td>{b.bloodBankRegistration?.bloodBankName}</td>
                  <td>{b.bloodBankRegistration?.address}</td>
                  <td>{b.distance}</td>
                  <td className={`status ${b.availability.toLowerCase()}`}>
                    {b.availability}
                  </td>
                  <td>{b.bloodBankRegistration?.phoneNo}</td>
                  <td>
                    <button
                      className="md-btn cancel"
                      onClick={() => handleChooseBloodbank(b.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </section>
    </main>
  );
}

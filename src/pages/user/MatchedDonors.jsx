
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMatched } from "../../api-redux/userRedux/matchedSlice";
// import "./MatchedDonors.css";
// import { useNavigate } from "react-router-dom";


// export default function MatchedDonors() {

//   const navigate=useNavigate();

//   const dispatch = useDispatch();
//   const { loading, data, error } = useSelector((state) => state.matched);

// useEffect(() => {

//      dispatch(fetchMatched());

//   }, [dispatch]);


//   if (loading) return <div className="md-loader">Loading...</div>;
//   if (error) return <p className="md-error">{error}</p>;
//   if (!data) return <p>No data found.</p>;



//   const handleCheckStatus = () => {
//       navigate("/check-status",{state:data})
//   };


//   return (
//     <main className="md-container">

//       {/* HEADER */}
//       <div className="md-header">
//         <h2>Matched Donors & Blood Banks</h2>
//       </div>


//       <h3 className="md-section-title">Donors</h3>

//       <div className="md-list">
//         {data.donorStatuses?.length > 0 ? (
//           data.donorStatuses.map((d, i) => (
//             <div key={i} className="md-card fade-in">
//               <h3 className="md-name">{d.donorRegistration?.name || "Unknown Donor"}</h3>
//               <p className="md-info">Blood Group: <span>{d.bloodGroup || "N/A"}</span></p>
//               <p className="md-info">Distance: <span>{d.distance ?? "N/A"} km</span></p>
//               <p className="md-info">PhoneNo: <span>{d.donorRegistration.phone_no ?? "N/A"} </span></p>
//               <span className="md-status pending">{d.availability || "N/A"}</span>
//             </div>
//           ))
//         ) : (
//           <p className="md-empty">No Donors Found</p>
//         )}
//       </div>


//       <h3 className="md-section-title">Blood Banks</h3>
//       {data.bloodbankStatuses?.length > 0 ? (
//         data.bloodbankStatuses.map((b, i) => (
//           <div key={i} className="md-card fade-in">
//             <h3 className="md-name">{b.bloodBankRegistration?.bloodBankName || "Unknown Bank"}</h3>
//             {/* <p className="md-info">Address: <span>{b.bloodBankRegistration?.address || "N/A"}</span></p> */}
//             <p className="md-info">Distance: <span>{b.distance ?? "N/A"} km</span></p>
//              <p className="md-info">PhoneNo: <span>{b.bloodBankRegistration.phoneNo ?? "N/A"} </span></p>
//             <span className="md-status pending">{b.availability || "N/A"}</span>
//           </div>
//         ))
//       ) : (
//         <p className="md-empty">No Blood Banks Found</p>
//       )}


//       {/* BUTTON */}
//       <div className="md-btn-wrap">
//         <button onClick={handleCheckStatus} className="md-confirm-btn">Check Status</button>
//       </div>

//     </main>
//   );
// }


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatched } from "../../api-redux/userRedux/matchedSlice";
import "./MatchedDonors.css";
import { useNavigate } from "react-router-dom";

export default function MatchedDonors() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector((state) => state.matched);

  useEffect(() => {
    dispatch(fetchMatched());
  }, [dispatch]);

  if (loading) {
  return (
    <div className="md-loader-wrapper">
      <div className="md-loader-circle"></div>
      <p className="md-loader-text">Loading...</p>
    </div>
  );
}

  if (error) return <p className="md-error">{error}</p>;
  if (!data) return <p>No data found.</p>;

  const goBack = () => navigate(-1);
  const handleCheckStatus = () => navigate("/check-status", { state: data });
return (
  <div className="md-page">

    {/* BACK BUTTON */}
    <button className="md-back-btn" onClick={goBack}>← Back</button>

    <h2 className="md-title">Matched Results</h2>

    
    {/* ================= DONORS TABLE ================= */}
    <section className="md-section">
  <h3 className="md-subtitle">Matched Donors</h3>

  {data.donorStatuses?.length > 0 ? (
    <div className="md-table-box">
      <table className="md-table-b">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th className="highlight-col">Availability</th>
            <th>Distance</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {data.donorStatuses.map((d, i) => (
            <tr key={i}>
              <td>{d?.donorRegistration?.name || "Unknown"}</td>
              <td>{d?.bloodGroup || "N/A"}</td>
              <td className="highlight-col status-cell">
                <span className={`pill-b ${String(d.availability).toLowerCase()}`}>
                  {d.availability}
                </span>
              </td>
              <td>{d?.distance ?? "N/A"} km</td>
              <td>{d?.donorRegistration?.phone_no ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="md-empty">No Donors Found</p>
  )}
</section>

    {/* ================= BLOOD BANKS TABLE ================= */}
    <section className="md-section">
  <h3 className="md-subtitle">Nearby Blood Banks</h3>

  {data.bloodbankStatuses?.length > 0 ? (
    <div className="md-table-box">
      <table className="md-table-b">
        <thead>
          <tr>
            <th>Blood Bank</th>
            <th>Blood Group</th>
            <th className="highlight-col">Availability</th>
            <th>Distance</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {data.bloodbankStatuses.map((b, i) => (
            <tr key={i}>
              <td>{b?.bloodBankRegistration?.bloodBankName || "N/A"}</td>
              <td>{b?.bloodGroup || "N/A"}</td>
              <td className="highlight-col status-cell">
                <span className={`pill-b ${String(b.availability).toLowerCase()}`}>
                  {b.availability}
                </span>
              </td>
              <td>{b?.distance ?? "N/A"} km</td>
              <td>{b?.bloodBankRegistration?.phoneNo ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="md-empty">No Blood Banks Found</p>
  )}
</section>




    {/* CHECK STATUS BUTTON */}
    <button className="md-confirm-btn" onClick={handleCheckStatus}>
      Check Status
    </button>

  </div>
);
}

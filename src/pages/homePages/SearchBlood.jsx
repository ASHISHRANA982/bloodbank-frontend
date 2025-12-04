import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchBlood } from "../../api-redux/homeRedux/searchBloodSlice";

export default function SearchBlood() {
  const dispatch = useDispatch();
  const { loading, searchResult, error } = useSelector(
    (state) => state.searchBlood
  );

  // useEffect(() => {
  //   if (error) {
  //     alert(error); 
  //   }
  // }, [error]);

  const [form, setForm] = useState({
    bloodGroup: "",
    address: "",
    bloodType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    dispatch(searchBlood(form));
  };

  return (
  <div className="search-wrapper">

    <div className="search-header">
      <h2>🔍 Search Blood</h2>
    </div>

    <div className="search-body">
      <input
        name="bloodGroup"
        placeholder="Enter Blood Group (ex: AB+)"
        value={form.bloodGroup}
        onChange={handleChange}
        className="search-input"
      />

      <input
        name="address"
        placeholder="Enter Location"
        value={form.address}
        onChange={handleChange}
        className="search-input"
      />

      <select
        name="bloodType"
        value={form.bloodType}
        onChange={handleChange}
        className="search-select"
      >
        <option value="">Select Blood Type</option>
        <option value="Whole Blood">Whole Blood</option>
        <option value="Plasma">Plasma</option>
        <option value="Power Red">Power Red</option>
        <option value="Platelets">Platelets</option>
      </select>

      <button
        onClick={handleSearch}
        disabled={loading}
        className="search-btn"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p className="error">{error}</p>}
    </div>

    {searchResult && (
      <div className="search-results">
        <h3 className="results-title">Search Results</h3>

        {searchResult.map((item, index) => (
          <div className="result-card" key={index}>
            <p><strong>Blood Group:</strong> {item.bloodGroup}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Collection Date:</strong> {item.collectionDate}</p>

            <p><strong>Bank Name:</strong> {item.bloodBankName}</p>
            <p><strong>Address:</strong> {item.bloodBankAddress}</p>
            <p><strong>Email:</strong> {item.bloodBankEmail}</p>
            <p><strong>Phone:</strong> {item.bloodBankPhoneNo}</p>

            <hr />
          </div>
        ))}
      </div>
    )}

  </div>
);

}

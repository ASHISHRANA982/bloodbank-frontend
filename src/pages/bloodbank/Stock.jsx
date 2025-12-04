import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStocks,
  addStock,
  updateStock,
  deleteStock,
} from "../../api-redux/bloodbankRedux/stockFacilitySlice";

import "./bloodbankStock.css";

const BloodStockComponent = ({ bloodbankId }) => {
  const dispatch = useDispatch();
  const { stocks, loading, message } = useSelector(
    (state) => state.stockFacility
  );

  const [componentType, setComponentType] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState("");
  const [collectionDate, setCollectionDate] = useState("");

  useEffect(() => {
    dispatch(getStocks());
  }, [dispatch, message]);

  const handleAdd = () => {
    if (!componentType || !bloodGroup || !quantity || !collectionDate) return;

    const payload = {
      componentType,
      bloodGroup,
      quantity: Number(quantity),
      collectionDate: collectionDate + ":00",
      bloodBank: { id: bloodbankId },
    };

    dispatch(addStock(payload));

    setComponentType("");
    setBloodGroup("");
    setQuantity("");
    setCollectionDate("");
  };

  const handleUpdate = (id) => {
    const newQty = prompt("Enter new quantity:");
    const numQty = Number(newQty);
    if (newQty && !isNaN(numQty) && numQty >= 0) {
      dispatch(updateStock({ id, quantity: numQty }));
    }
  };

  const formatDate = (arr) => {
    if (!arr) return "N/A";
    const [year, month, day, hour, minute] = arr;
    return new Date(year, month - 1, day, hour, minute).toLocaleString();
  };

  return (
    <div className="stock-container">
      {/* <h2 className="stock-title">Blood Stock Management</h2> */}

      {/* Add New Stock Section */}
      <div className="add-stock-box">
        <h3>Add New Stock</h3>

        <div className="add-stock-form">
          <select
            value={componentType}
            onChange={(e) => setComponentType(e.target.value)}
            className="stock-input"
          >
            <option value="">Select Component</option>
            <option value="Whole Blood">Whole Blood</option>
            <option value="Plasma">Plasma</option>
            <option value="Platelets">Platelets</option>
          </select>

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="stock-input"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <input
            type="number"
            placeholder="Quantity"
            className="stock-input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            type="datetime-local"
            className="stock-input"
            value={collectionDate}
            onChange={(e) => setCollectionDate(e.target.value)}
          />

          <button className="add-stock-btn" onClick={handleAdd}>
            + Add Stock
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && <p className="info-text">Loading stocks...</p>}

      {/* List of Stocks */}
      <div className="stock-list">
        {stocks.map((s) => (
          <div key={s.id} className="stock-card">
            <div className="stock-row"><strong>ID:</strong> {s.id}</div>
            <div className="stock-row"><strong>Component:</strong> {s.componentType}</div>
            <div className="stock-row"><strong>Blood Group:</strong> {s.bloodGroup}</div>
            <div className="stock-row"><strong>Quantity:</strong> {s.quantity}</div>
            <div className="stock-row"><strong>Collection Date:</strong> {formatDate(s.collectionDate)}</div>
            <div className="stock-row"><strong>Expiry Date:</strong> {formatDate(s.expiryDate)}</div>
            <div className="stock-row"><strong>Status:</strong> {s.status}</div>

            <div className="stock-actions">
              <button className="edit-btn" onClick={() => handleUpdate(s.id)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => dispatch(deleteStock(s.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {message && <p className="success-text">{message}</p>}
    </div>
  );
};

export default BloodStockComponent;

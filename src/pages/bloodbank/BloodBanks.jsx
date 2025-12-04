import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerBloodBank } from "../../api-redux/bloodbankRedux/bloodBankSlice";
import "./bloodbankRegister.css"; 

const BloodBankRegister = () => {
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector(
    (state) => state.bloodBank
  );

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const componentTypes = ["Whole Blood", "Plasma", "Red Cell"];
  const licenceTypes = ["Govt", "Private", "NGOs"];

  const [formData, setFormData] = useState({
    bloodBankName: "",
    address: "",
    phoneNo: "",
    email: "",
    licenceNo: "",
    licenceType: "",
    licenceValidityDate: "",
    issuingAuthority: "",
    workingHour: "",
    stockList: [
      { componentType: "", bloodGroup: "", quantity: "", collectionDate: "" },
    ],
    facilities: [{ facilityName: "" }],
    file: null,
  });

  const [errors, setErrors] = useState({});

  // Add new fields (stock + facility handlers)
  const addStockItem = () => {
    setFormData({
      ...formData,
      stockList: [
        ...formData.stockList,
        { componentType: "", bloodGroup: "", quantity: "", collectionDate: "" },
      ],
    });
  };

  const removeStockItem = (i) => {
    setFormData({
      ...formData,
      stockList: formData.stockList.filter((_, idx) => idx !== i),
    });
  };

  const handleStockChange = (index, field, value) => {
    const updated = [...formData.stockList];
    updated[index][field] = value;
    setFormData({ ...formData, stockList: updated });
  };

  const addFacility = () => {
    setFormData({
      ...formData,
      facilities: [...formData.facilities, { facilityName: "" }],
    });
  };

  const removeFacility = (i) => {
    setFormData({
      ...formData,
      facilities: formData.facilities.filter((_, idx) => idx !== i),
    });
  };

  const handleFacilityChange = (index, value) => {
    const updated = [...formData.facilities];
    updated[index].facilityName = value;
    setFormData({ ...formData, facilities: updated });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Full validation (untouched logic)
  const validateForm = () => {
    const newErrors = {};
    if (!formData.bloodBankName) newErrors.bloodBankName = "Blood bank name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phoneNo || !/^\d{10,15}$/.test(formData.phoneNo))
      newErrors.phoneNo = "Valid phone number is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.licenceNo) newErrors.licenceNo = "Licence number is required";
    if (!formData.licenceType) newErrors.licenceType = "Licence type is required";
    if (!formData.licenceValidityDate) newErrors.licenceValidityDate = "Licence validity date is required";
    if (!formData.issuingAuthority) newErrors.issuingAuthority = "Issuing authority is required";
    if (!formData.workingHour) newErrors.workingHour = "Working hour is required";
    if (!formData.file) newErrors.file = "Licence copy file is required";

    formData.stockList.forEach((stock, index) => {
      if (!stock.componentType)
        newErrors[`stockComponentType${index}`] = "Component type required";
      if (!stock.bloodGroup)
        newErrors[`stockBloodGroup${index}`] = "Blood group required";
      if (!stock.quantity || Number(stock.quantity) <= 0)
        newErrors[`stockQuantity${index}`] = "Quantity must be > 0";
      if (!stock.collectionDate)
        newErrors[`stockCollectionDate${index}`] = "Collection date required";
    });

    formData.facilities.forEach((f, index) => {
      if (!f.facilityName)
        newErrors[`facilityName${index}`] = "Facility name required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit unchanged
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedStockList = formData.stockList.map((item) => ({
      ...item,
      collectionDate: item.collectionDate + ":00",
    }));

    const data = new FormData();
    data.append("bloodBankName", formData.bloodBankName);
    data.append("address", formData.address);
    data.append("phoneNo", formData.phoneNo);
    data.append("email", formData.email);
    data.append("licenceNo", formData.licenceNo);
    data.append("licenceType", formData.licenceType);
    data.append("licenceValidityDate", formData.licenceValidityDate);
    data.append("issuingAuthority", formData.issuingAuthority);
    data.append("workingHour", formData.workingHour);
    data.append("stockList", JSON.stringify(formattedStockList));
    data.append("facilities", JSON.stringify(formData.facilities));
    if (formData.file) data.append("file", formData.file);

    dispatch(registerBloodBank(data));
  };

  return (
    <div className="register-container">

      <h2 className="register-title">Blood Bank Registration</h2>

      {/* LOGIN LINK */}
      

      <form onSubmit={handleSubmit} className="register-form">

        {/* ==== LEFT SIDE ==== */}
        <div className="register-left">

          <div className="form-group">
            <label>Blood Bank Name</label>
            <input type="text" name="bloodBankName" onChange={handleChange} />
            {errors.bloodBankName && <p className="err">{errors.bloodBankName}</p>}
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" onChange={handleChange} />
            {errors.address && <p className="err">{errors.address}</p>}
          </div>

          <div className="form-group">
            <label>Phone No</label>
            <input type="text" name="phoneNo" onChange={handleChange} />
            {errors.phoneNo && <p className="err">{errors.phoneNo}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} />
            {errors.email && <p className="err">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Licence No</label>
            <input type="text" name="licenceNo" onChange={handleChange} />
            {errors.licenceNo && <p className="err">{errors.licenceNo}</p>}
          </div>

          <div className="form-group">
            <label>Licence Type</label>
            <select name="licenceType" onChange={handleChange}>
              <option value="">Select Licence Type</option>
              {licenceTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.licenceType && <p className="err">{errors.licenceType}</p>}
          </div>

          <div className="form-group">
            <label>Licence Validity Date</label>
            <input type="date" name="licenceValidityDate" onChange={handleChange} />
            {errors.licenceValidityDate && <p className="err">{errors.licenceValidityDate}</p>}
          </div>

          <div className="form-group">
            <label>Issuing Authority</label>
            <input type="text" name="issuingAuthority" onChange={handleChange} />
            {errors.issuingAuthority && <p className="err">{errors.issuingAuthority}</p>}
          </div>

          <div className="form-group">
            <label>Working Hour</label>
            <input
              type="text"
              name="workingHour"
              placeholder="Ex: 9:00 AM - 5:00 PM"
              onChange={handleChange}
            />
            {errors.workingHour && <p className="err">{errors.workingHour}</p>}
          </div>

          <div className="form-group">
            <label>Licence File Upload</label>
            <input type="file" onChange={handleFileChange} />
            {errors.file && <p className="err">{errors.file}</p>}
          </div>
        </div>

        {/* ==== RIGHT SIDE (STOCK + FACILITY) ==== */}
        <div className="register-right">

          {/* STOCK LIST */}
          <div className="stock-box">
            <h3>Stock List</h3>

            {formData.stockList.map((item, i) => (
              <div key={i} className="stock-item">
                <select
                  value={item.componentType}
                  onChange={(e) =>
                    handleStockChange(i, "componentType", e.target.value)
                  }
                >
                  <option value="">Component</option>
                  {componentTypes.map((ct) => (
                    <option key={ct}>{ct}</option>
                  ))}
                </select>

                <select
                  value={item.bloodGroup}
                  onChange={(e) =>
                    handleStockChange(i, "bloodGroup", e.target.value)
                  }
                >
                  <option value="">Blood Group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg}>{bg}</option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    handleStockChange(i, "quantity", e.target.value)
                  }
                />

                <input
                  type="datetime-local"
                  value={item.collectionDate}
                  onChange={(e) =>
                    handleStockChange(i, "collectionDate", e.target.value)
                  }
                />

                {i > 0 && (
                  <button type="button" className="remove-btn" onClick={() => removeStockItem(i)}>
                    Remove
                  </button>
                )}

                {/* ERRORS */}
                {errors[`stockComponentType${i}`] && (
                  <p className="err">{errors[`stockComponentType${i}`]}</p>
                )}
                {errors[`stockBloodGroup${i}`] && (
                  <p className="err">{errors[`stockBloodGroup${i}`]}</p>
                )}
                {errors[`stockQuantity${i}`] && (
                  <p className="err">{errors[`stockQuantity${i}`]}</p>
                )}
                {errors[`stockCollectionDate${i}`] && (
                  <p className="err">{errors[`stockCollectionDate${i}`]}</p>
                )}
              </div>
            ))}

            <button type="button" onClick={addStockItem} className="add-btn">
              + Add Stock
            </button>
          </div>

          {/* FACILITIES */}
          <div className="facility-box">
            <h3>Facilities</h3>

            {formData.facilities.map((item, i) => (
              <div key={i} className="facility-item">
                <input
                  type="text"
                  placeholder="Facility Name"
                  value={item.facilityName}
                  onChange={(e) => handleFacilityChange(i, e.target.value)}
                />

                {i > 0 && (
                  <button type="button" className="remove-btn" onClick={() => removeFacility(i)}>
                    Remove
                  </button>
                )}

                {errors[`facilityName${i}`] && (
                  <p className="err">{errors[`facilityName${i}`]}</p>
                )}
              </div>
            ))}

            <button type="button" onClick={addFacility} className="add-btn">
              + Add Facility
            </button>
          </div>
        </div>
      </form>

      <button type="submit" onClick={handleSubmit} className="register-submit-btn">
        {loading ? "Registering..." : "Register"}
      </button>
<p className="login-redirect">
        Already registered?{" "}
        <a href="/bloodbank-login" className="login-link">Login here</a>
      </p>
      {successMessage && <p className="success">{successMessage}</p>}
      {error && <p className="err">{typeof error === "string" ? error : JSON.stringify(error)}</p>}
    </div>
  );
};

export default BloodBankRegister;

// import React, { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import Input from "../components/Input";

// const AddTransaction = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     amount: "",
//     type: "income",
//     category: "Food",
//     note: "",
//     date: "",
//   });
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");

//     // Validation
//     if (!formData.title.trim()) {
//       setError("Title is required");
//       return;
//     }

//     if (formData.title.trim().length < 3) {
//       setError("Title must be at least 3 characters");
//       return;
//     }

//     if (!formData.amount || Number(formData.amount) <= 0) {
//       setError("Amount must be greater than 0");
//       return;
//     }

//     if (!formData.type) {
//       setError("Please select transaction type");
//       return;
//     }

//     if (!formData.category) {
//       setError("Please select a category");
//       return;
//     }

//     if (!formData.date) {
//       setError("Please select a date");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await api.post("/transaction", formData);

//       if (response.data.success) {
//         alert("Transaction Added Successfully");
//         navigate("/transaction");
//       }
//     } catch (err) {
//       console.log(err.response?.data?.message);

//       setError(
//         err.response?.data?.message ||
//           "Failed to add transaction. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Add Transaction</h1>

//       <form onSubmit={handleSubmit}>
//         {error && <p className="form-error">{error}</p>}
//         <Input
//           type="text"
//           name="title"
//           value={formData.title}
//           placeholder="Enter Title"
//           onChange={handleChange}
//         />

//         <Input
//           type="number"
//           name="amount"
//           value={formData.amount}
//           placeholder="Enter Amount"
//           onChange={handleChange}
//         />

//         <select name="type" value={formData.type} onChange={handleChange}>
//           <option value="income">Income</option>
//           <option value="expense">Expense</option>
//         </select>

//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//         >
//           <option value="Food">Food</option>
//           <option value="Salary">Salary</option>
//           <option value="Shopping">Shopping</option>
//           <option value="Travel">Travel</option>
//           <option value="Entertainment">Entertainment</option>
//           <option value="Health">Health</option>
//           <option value="Bills">Bills</option>
//           <option value="Education">Education</option>
//           <option value="Other">Other</option>
//         </select>

//         <Input
//           type="text"
//           name="note"
//           value={formData.note}
//           placeholder="Enter Note"
//           onChange={handleChange}
//         />

//         <Input
//           type="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//         />

//         <Button
//           text={loading ? "Adding..." : "Add Transaction"}
//           disabled={loading}
//         />
//       </form>
//     </div>
//   );
// };

// export default AddTransaction;
import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Bell, UserCircle } from "lucide-react";
import "./AddTransaction.css";

const AddTransaction = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    note: "",
    date: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const categories = [
    "Food",
    "Salary",
    "Shopping",
    "Travel",
    "Entertainment",
    "Health",
    "Bills",
    "Education",
    "Other",
  ];

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // HANDLE INCOME / EXPENSE
  // =========================

  const handleTypeChange = (selectedType) => {
    setFormData({
      ...formData,
      type: selectedType,
    });
  };

  // =========================
  // HANDLE CATEGORY
  // =========================

  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      category: category,
    });

    setCategoryOpen(false);
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validation

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (formData.title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    if (!formData.type) {
      setError("Please select transaction type");
      return;
    }

    if (!formData.category) {
      setError("Please select a category");
      return;
    }

    if (!formData.date) {
      setError("Please select a date");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/transaction", formData);

      if (response.data.success) {
        alert("Transaction Added Successfully");
        navigate("/transaction");
      }
    } catch (err) {
      console.log(err.response?.data?.message);

      setError(
        err.response?.data?.message ||
          "Failed to add transaction. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-page">
      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="transaction-header">
        {/* LOGO */}
        <div className="transaction-logo">FinTrack</div>

        {/* NAVIGATION */}
        <nav className="transaction-nav">
          <button
            onClick={() => navigate("/dashboard")}
            className="transaction-nav-link"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/transaction")}
            className="transaction-nav-link"
          >
            Transactions
          </button>

          <button className="transaction-nav-link active">
            Add-Transaction
          </button>
        </nav>

        {/* RIGHT SIDE */}
        <div className="transaction-nav-actions">
          <button className="transaction-icon-button" title="Notifications">
            <Bell size={23} />
          </button>

          <button
            className="transaction-icon-button"
            title="Profile"
            onClick={() => navigate("/profile")}
          >
            <UserCircle size={23} />
          </button>
        </div>
      </header>

      {/* =================================================
          ADD TRANSACTION CONTENT
      ================================================= */}

      <div className="transaction-form-wrapper">
        <div className="transaction-form-card">
          {/* =========================
              FORM HEADER
          ========================= */}

          <div className="transaction-form-header">
            <h1>New Transaction</h1>

            <p>Record a new income or expense entry.</p>
          </div>

          <div className="form-divider"></div>

          {/* =========================
              FORM
          ========================= */}

          <form onSubmit={handleSubmit}>
            {/* ERROR */}

            {error && <div className="form-error">{error}</div>}

            {/* =========================
                TITLE
            ========================= */}

            <div className="form-group full-width">
              <label>TITLE</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="e.g., Grocery Shopping"
                className="title-input"
                onChange={handleChange}
              />
            </div>

            {/* =========================
                TYPE + AMOUNT
            ========================= */}

            <div className="form-row">
              {/* TYPE */}

              <div className="form-group">
                <label>TYPE</label>

                <div className="type-selector">
                  {/* SLIDING WHITE BOX */}

                  <div
                    className={`type-slider ${
                      formData.type === "income"
                        ? "slider-income"
                        : "slider-expense"
                    }`}
                  ></div>

                  {/* EXPENSE */}

                  <button
                    type="button"
                    className={`type-btn ${
                      formData.type === "expense" ? "expense-selected" : ""
                    }`}
                    onClick={() => handleTypeChange("expense")}
                  >
                    <span className="type-arrow">↓</span>

                    <span>Expense</span>
                  </button>

                  {/* INCOME */}

                  <button
                    type="button"
                    className={`type-btn ${
                      formData.type === "income" ? "income-selected" : ""
                    }`}
                    onClick={() => handleTypeChange("income")}
                  >
                    <span className="type-arrow">↑</span>

                    <span>Income</span>
                  </button>
                </div>
              </div>

              {/* AMOUNT */}

              <div className="form-group">
                <label>AMOUNT</label>

                <div className="amount-input-wrapper">
                  <span className="currency">$</span>

                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* =========================
                CATEGORY + DATE
            ========================= */}

            <div className="form-row">
              {/* CATEGORY */}

              <div className="form-group">
                <label>CATEGORY</label>

                <div className="category-dropdown">
                  {/* SELECTED CATEGORY */}

                  <button
                    type="button"
                    className="category-selected"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                  >
                    <span>{formData.category}</span>

                    {/* CHEVRON */}

                    <span
                      className={`category-chevron ${
                        categoryOpen ? "chevron-up" : ""
                      }`}
                    ></span>
                  </button>

                  {/* CATEGORY MENU */}

                  <div
                    className={`category-menu ${
                      categoryOpen ? "category-menu-open" : ""
                    }`}
                  >
                    {categories.map((category) => (
                      <button
                        type="button"
                        key={category}
                        className={`category-option ${
                          formData.category === category
                            ? "selected-category"
                            : ""
                        }`}
                        onClick={() => handleCategoryChange(category)}
                      >
                        <span>{category}</span>

                        {formData.category === category && (
                          <span className="category-check">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* DATE */}

              <div className="form-group">
                <label>DATE</label>

                <div className="date-input-wrapper">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* =========================
                NOTE
            ========================= */}

            <div className="form-group full-width note-group">
              <label>NOTE (OPTIONAL)</label>

              <textarea
                name="note"
                value={formData.note}
                placeholder="Add additional details here..."
                onChange={handleChange}
              />
            </div>

            {/* =========================
                BOTTOM DIVIDER
            ========================= */}

            <div className="form-divider bottom-divider"></div>

            {/* =========================
                BUTTONS
            ========================= */}

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/transaction")}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="add-transaction-btn"
                disabled={loading}
              >
                <span className="plus-icon">⊕</span>

                {loading ? "Adding..." : "Add Transaction"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;

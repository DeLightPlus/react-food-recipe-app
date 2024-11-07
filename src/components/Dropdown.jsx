import  { useState } from "react";
import styles from "./Dropdown.module.css"; // Import the CSS module

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the dropdown menu
  const [selectedValue, setSelectedValue] = useState("Category"); // Default selected value

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle item selection
  const handleItemClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        {selectedValue}
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownItem} onClick={() => handleItemClick("Default")}>
            Text
          </div>
          <div className={styles.dropdownItem} onClick={() => handleItemClick("Number")}>
            Number
          </div>
          <div className={styles.dropdownItem} onClick={() => handleItemClick("Date")}>
            Date
          </div>
          <div className={styles.dropdownItem} onClick={() => handleItemClick("Single Date")}>
            Single Date
          </div>
          <div className={styles.dropdownItem} onClick={() => handleItemClick("Iteration")}>
            Iteration
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

import { useState, useEffect } from "react";
import styles from "./Dropdown.module.css"; // Import the CSS module
import axios from "axios"; // Make sure axios is installed

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the dropdown menu
  const [selectedValue, setSelectedValue] = useState("Category"); // Default selected value
  const [categories, setCategories] = useState([]); // State to store the fetched categories

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle item selection
  const handleItemClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false); // Close the dropdown after selection
  };

  // Fetch categories from the API when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        setCategories(response.data.categories); // Update the categories state with fetched data
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className={styles.dropdown}><strong>Category</strong>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        {selectedValue}
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.strCategory}
                className={styles.dropdownItem}
                onClick={() => handleItemClick(category.strCategory)}
              >
                {category.strCategory}
              </div>
            ))
          ) : (
            <div className={styles.dropdownItem}>Loading...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

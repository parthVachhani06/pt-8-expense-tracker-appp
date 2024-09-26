// src/components/Navbar.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaChartPie, FaCog, FaUserCircle, FaSearch } from 'react-icons/fa'; // Import icons

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333; 
  padding: 1rem 2rem;
  color: white;
  position: relative;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    display: flex;
    align-items: center;

    &:hover {
      color: #ffcc00; // Highlight color
    }

    svg {
      margin-right: 0.5rem; // Space between icon and text
    }
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px; // Adjust based on navbar height
    left: 0;
    background-color: #333;
    width: 100%;
    padding: 1rem;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none; // Hide toggle on larger screens
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center; // Aligns icon and input in center
`;

const SearchInput = styled.input`
  padding: 0.5rem 2rem; // Add right padding for the icon
  border: none;
  border-radius: 4px;
  outline: none; // Removes default outline
  background-color: #444; // Dark background for input
  color: white; // White text color for better contrast

  &::placeholder {
    color: #bbb; // Placeholder color
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px; // Positioning the icon inside the input
  top: 50%;
  transform: translateY(-50%); // Center the icon vertically
  color: #888; // Icon color
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;

  a {
    color: white;
    font-size: 25px;
    text-decoration: none;
    display: flex;
    align-items: center;

    svg {
      margin-left: 0.5rem; // Space between text and icon
    }
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <Logo>Expense Tracker</Logo>
      <ToggleButton onClick={toggleNavbar}>
        {isOpen ? '✖️' : '☰'}
      </ToggleButton>
      <NavLinks isOpen={isOpen}>
        <Link to="/">
          <FaHome /> Dashboard
        </Link>
        <Link to="/add-expense">
          <FaPlusCircle /> Add Expense
        </Link>
        <Link to="/expensecharts">
          <FaChartPie /> Reports
        </Link>
        <Link to="/settings">
          <FaCog /> Settings
        </Link>
      </NavLinks>
      <SearchContainer>
        <SearchIcon />
        <SearchInput type="text" placeholder="Search expenses..." />
      </SearchContainer>
      <UserProfile>
        <Link to="/profile">
          <FaUserCircle />
        </Link>
      </UserProfile>
    </NavbarContainer>
  );
};

export default Navbar;

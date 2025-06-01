import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/generator'
  })
}));

test('renders Generator Monitor title', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/Generator Monitor/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation menu items', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  // Check for main navigation items
  expect(screen.getByText(/Generator/i)).toBeInTheDocument();
  expect(screen.getByText(/Engine/i)).toBeInTheDocument();
  expect(screen.getByText(/Alarms/i)).toBeInTheDocument();
  expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  expect(screen.getByText(/Report/i)).toBeInTheDocument();
  expect(screen.getByText(/Delete Account/i)).toBeInTheDocument();
});

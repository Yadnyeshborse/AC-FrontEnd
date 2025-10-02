import React from 'react';
import { render, screen } from '@testing-library/react';
import Building from './Building';

// Mock the API module
jest.mock('../services/api', () => ({
  buildingAPI: {
    getBuilding: jest.fn(() => Promise.resolve({
      data: {
        requestedTemperature: 25.0
      }
    })),
    getRooms: jest.fn(() => Promise.resolve({
      data: []
    }))
  }
}));

test('renders building control system title', async () => {
  render(<Building />);
  const titleElement = await screen.findByText(/Building Control System/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders add room button', async () => {
  render(<Building />);
  const addButton = await screen.findByText(/Add Room/i);
  expect(addButton).toBeInTheDocument();
});

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Building API endpoints
export const buildingAPI = {
  // Get building details
  getBuilding: () => api.get('/building'),
  
  // Update building requested temperature
  updateRequestedTemperature: (temperature) => 
    api.put(`/building/temperature/${temperature}`),
  
  // Get all rooms
  getRooms: () => api.get('/building/rooms'),
  
  // Add apartment
  addApartment: (apartmentData) => 
    api.post('/building/apartments', apartmentData),
  
  // Add common room
  addCommonRoom: (commonRoomData) => 
    api.post('/building/common-rooms', commonRoomData),
  
  // Update room
  updateRoom: (roomId, roomData) => 
    api.put(`/building/rooms/${roomId}`, roomData),
  
  // Delete room
  deleteRoom: (roomId) => 
    api.delete(`/building/rooms/${roomId}`),
  
  // Get room by ID
  getRoom: (roomId) => 
    api.get(`/building/rooms/${roomId}`),
};

// Error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;

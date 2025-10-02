import React, { useState, useEffect } from 'react';
import { Building2, Thermometer, Plus, RefreshCw } from 'lucide-react';
import RoomCard from './RoomCard';
import AddRoomModal from './AddRoomModal';
import { buildingAPI } from '../services/api';
import './Building.css';

const Building = () => {
  const [building, setBuilding] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditingTemp, setIsEditingTemp] = useState(false);
  const [newRequestedTemp, setNewRequestedTemp] = useState(0);

  useEffect(() => {
    fetchBuildingData();
    // Set up polling for real-time updates every 5 seconds
    const interval = setInterval(fetchBuildingData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBuildingData = async () => {
    try {
      const [buildingResponse, roomsResponse] = await Promise.all([
        buildingAPI.getBuilding(),
        buildingAPI.getRooms()
      ]);
      
      setBuilding(buildingResponse.data);
      setRooms(roomsResponse.data);
      setNewRequestedTemp(buildingResponse.data.requestedTemperature);
      setError(null);
    } catch (err) {
      setError('Failed to fetch building data. Make sure the backend is running.');
      console.error('Error fetching building data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRequestedTemperature = async () => {
    try {
      await buildingAPI.updateRequestedTemperature(newRequestedTemp);
      await fetchBuildingData(); // Refresh data to get updated heating/cooling status
      setIsEditingTemp(false);
    } catch (err) {
      setError('Failed to update temperature');
      console.error('Error updating temperature:', err);
    }
  };

  const handleUpdateRoom = async (roomId, roomData) => {
    try {
      await buildingAPI.updateRoom(roomId, roomData);
      await fetchBuildingData(); // Refresh data
    } catch (err) {
      setError('Failed to update room');
      console.error('Error updating room:', err);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await buildingAPI.deleteRoom(roomId);
        await fetchBuildingData(); // Refresh data
      } catch (err) {
        setError('Failed to delete room');
        console.error('Error deleting room:', err);
      }
    }
  };

  const handleAddRoom = async (roomData) => {
    try {
      if (roomData.type === 'APARTMENT') {
        await buildingAPI.addApartment(roomData);
      } else {
        await buildingAPI.addCommonRoom(roomData);
      }
      await fetchBuildingData(); // Refresh data
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add room');
      console.error('Error adding room:', err);
    }
  };

  const getActiveSystemsCount = () => {
    const heating = rooms.filter(room => room.heatingEnabled).length;
    const cooling = rooms.filter(room => room.coolingEnabled).length;
    return { heating, cooling };
  };

  if (loading) {
    return (
      <div className="loading-container">
        <RefreshCw className="loading-spinner" />
        <p>Loading building data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={fetchBuildingData} className="retry-btn">
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  const { heating, cooling } = getActiveSystemsCount();

  return (
    <div className="building-container">
      <div className="building-header">
        <div className="building-title">
          <Building2 className="building-icon" />
          <h1>Building Control System</h1>
        </div>
        
        <div className="building-stats">
          <div className="stat-card">
            <span className="stat-label">Total Rooms</span>
            <span className="stat-value">{rooms.length}</span>
          </div>
          <div className="stat-card heating">
            <span className="stat-label">Heating Active</span>
            <span className="stat-value">{heating}</span>
          </div>
          <div className="stat-card cooling">
            <span className="stat-label">Cooling Active</span>
            <span className="stat-value">{cooling}</span>
          </div>
        </div>
      </div>

      <div className="building-controls">
        <div className="temperature-control">
          <div className="temp-display">
            <Thermometer className="temp-icon" />
            <div className="temp-info">
              <span className="temp-label">Building Target Temperature</span>
              {isEditingTemp ? (
                <div className="temp-edit">
                  <input
                    type="number"
                    value={newRequestedTemp}
                    onChange={(e) => setNewRequestedTemp(parseFloat(e.target.value))}
                    step="0.5"
                    min="10"
                    max="40"
                    className="temp-input"
                  />
                  <button onClick={handleUpdateRequestedTemperature} className="temp-save-btn">
                    Save
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditingTemp(false);
                      setNewRequestedTemp(building.requestedTemperature);
                    }} 
                    className="temp-cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="temp-value-container">
                  <span className="temp-value">{building?.requestedTemperature?.toFixed(1)}°C</span>
                  <button 
                    onClick={() => setIsEditingTemp(true)} 
                    className="temp-edit-btn"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="room-controls">
          <button 
            onClick={() => setShowAddModal(true)} 
            className="add-room-btn"
          >
            <Plus size={20} />
            Add Room
          </button>
          <button onClick={fetchBuildingData} className="refresh-btn">
            <RefreshCw size={20} />
            Refresh
          </button>
        </div>
      </div>

      <div className="rooms-grid">
        {rooms.length === 0 ? (
          <div className="no-rooms">
            <p>No rooms in the building yet.</p>
            <button 
              onClick={() => setShowAddModal(true)} 
              className="add-first-room-btn"
            >
              <Plus size={20} />
              Add First Room
            </button>
          </div>
        ) : (
          rooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
              onUpdateRoom={handleUpdateRoom}
              onDeleteRoom={handleDeleteRoom}
            />
          ))
        )}
      </div>

      {showAddModal && (
        <AddRoomModal
          onClose={() => setShowAddModal(false)}
          onAddRoom={handleAddRoom}
        />
      )}
    </div>
  );
};

export default Building;

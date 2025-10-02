import React, { useState } from 'react';
import { X, Home, Dumbbell, BookOpen, Shirt } from 'lucide-react';
import './AddRoomModal.css';

const AddRoomModal = ({ onClose, onAddRoom }) => {
  const [roomData, setRoomData] = useState({
    id: '',
    type: 'APARTMENT',
    ownerName: '',
    commonRoomType: 'GYM'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!roomData.id.trim()) {
      alert('Please enter a room ID');
      return;
    }

    if (roomData.type === 'APARTMENT' && !roomData.ownerName.trim()) {
      alert('Please enter the owner name for the apartment');
      return;
    }

    const submitData = {
      id: roomData.id.trim(),
      type: roomData.type
    };

    if (roomData.type === 'APARTMENT') {
      submitData.ownerName = roomData.ownerName.trim();
    } else {
      submitData.commonRoomType = roomData.commonRoomType;
    }

    onAddRoom(submitData);
  };

  const handleInputChange = (field, value) => {
    setRoomData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRoomTypeIcon = () => {
    if (roomData.type === 'APARTMENT') {
      return <Home className="room-type-icon" />;
    }
    switch (roomData.commonRoomType) {
      case 'GYM':
        return <Dumbbell className="room-type-icon" />;
      case 'LIBRARY':
        return <BookOpen className="room-type-icon" />;
      case 'LAUNDRY':
        return <Shirt className="room-type-icon" />;
      default:
        return <Home className="room-type-icon" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Room</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="roomId">Room ID *</label>
            <input
              id="roomId"
              type="text"
              value={roomData.id}
              onChange={(e) => handleInputChange('id', e.target.value)}
              placeholder="e.g., 101, 102, Gym-1"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomType">Room Type *</label>
            <select
              id="roomType"
              value={roomData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="form-select"
            >
              <option value="APARTMENT">Apartment</option>
              <option value="COMMON_ROOM">Common Room</option>
            </select>
          </div>

          {roomData.type === 'APARTMENT' && (
            <div className="form-group">
              <label htmlFor="ownerName">Owner Name *</label>
              <input
                id="ownerName"
                type="text"
                value={roomData.ownerName}
                onChange={(e) => handleInputChange('ownerName', e.target.value)}
                placeholder="Enter owner's name"
                className="form-input"
                required
              />
            </div>
          )}

          {roomData.type === 'COMMON_ROOM' && (
            <div className="form-group">
              <label htmlFor="commonRoomType">Common Room Type *</label>
              <select
                id="commonRoomType"
                value={roomData.commonRoomType}
                onChange={(e) => handleInputChange('commonRoomType', e.target.value)}
                className="form-select"
              >
                <option value="GYM">Gym</option>
                <option value="LIBRARY">Library</option>
                <option value="LAUNDRY">Laundry</option>
              </select>
            </div>
          )}

          <div className="room-preview">
            <div className="preview-header">
              <span>Preview:</span>
            </div>
            <div className="preview-card">
              {getRoomTypeIcon()}
              <div className="preview-info">
                <h4>{roomData.id || 'Room ID'}</h4>
                <p>
                  {roomData.type === 'APARTMENT' 
                    ? `Apartment - ${roomData.ownerName || 'Owner Name'}`
                    : `${roomData.commonRoomType} Room`
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;

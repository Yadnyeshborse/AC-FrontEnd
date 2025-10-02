import React, { useState } from 'react';
import { Thermometer, Flame, Snowflake, Home, Dumbbell, BookOpen, Shirt, Edit3, Trash2, Save, X } from 'lucide-react';
import './RoomCard.css';

const RoomCard = ({ room, onUpdateRoom, onDeleteRoom }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRoom, setEditedRoom] = useState({ ...room });

  const getRoomIcon = () => {
    if (room.type === 'APARTMENT') {
      return <Home className="room-icon" />;
    }
    switch (room.commonRoomType) {
      case 'GYM':
        return <Dumbbell className="room-icon" />;
      case 'LIBRARY':
        return <BookOpen className="room-icon" />;
      case 'LAUNDRY':
        return <Shirt className="room-icon" />;
      default:
        return <Home className="room-icon" />;
    }
  };

  const getStatusColor = () => {
    if (room.heatingEnabled) return 'heating';
    if (room.coolingEnabled) return 'cooling';
    return 'neutral';
  };

  const getStatusIcon = () => {
    if (room.heatingEnabled) return <Flame className="status-icon heating" />;
    if (room.coolingEnabled) return <Snowflake className="status-icon cooling" />;
    return <Thermometer className="status-icon neutral" />;
  };

  const handleSave = () => {
    onUpdateRoom(room.id, editedRoom);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedRoom({ ...room });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedRoom(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={`room-card ${getStatusColor()}`}>
      <div className="room-header">
        <div className="room-title">
          {getRoomIcon()}
          <div className="room-info">
            {isEditing ? (
              <input
                type="text"
                value={editedRoom.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
                className="edit-input"
                placeholder="Room ID"
              />
            ) : (
              <h3>{room.id}</h3>
            )}
            <span className="room-type">
              {room.type === 'APARTMENT' ? 'Apartment' : `${room.commonRoomType} Room`}
            </span>
          </div>
        </div>
        <div className="room-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="action-btn save">
                <Save size={16} />
              </button>
              <button onClick={handleCancel} className="action-btn cancel">
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="action-btn edit">
                <Edit3 size={16} />
              </button>
              <button onClick={() => onDeleteRoom(room.id)} className="action-btn delete">
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="room-details">
        {room.type === 'APARTMENT' && (
          <div className="detail-item">
            <strong>Owner:</strong>
            {isEditing ? (
              <input
                type="text"
                value={editedRoom.ownerName || ''}
                onChange={(e) => handleInputChange('ownerName', e.target.value)}
                className="edit-input"
                placeholder="Owner Name"
              />
            ) : (
              <span>{room.ownerName}</span>
            )}
          </div>
        )}

        {room.type === 'COMMON_ROOM' && (
          <div className="detail-item">
            <strong>Type:</strong>
            {isEditing ? (
              <select
                value={editedRoom.commonRoomType || 'GYM'}
                onChange={(e) => handleInputChange('commonRoomType', e.target.value)}
                className="edit-select"
              >
                <option value="GYM">Gym</option>
                <option value="LIBRARY">Library</option>
                <option value="LAUNDRY">Laundry</option>
              </select>
            ) : (
              <span>{room.commonRoomType}</span>
            )}
          </div>
        )}

        <div className="temperature-section">
          <div className="temperature-display">
            <Thermometer className="temp-icon" />
            <span className="temperature">{room.currentTemperature.toFixed(1)}°C</span>
          </div>
          
          <div className="status-display">
            {getStatusIcon()}
            <span className="status-text">
              {room.heatingEnabled ? 'Heating' : room.coolingEnabled ? 'Cooling' : 'Idle'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

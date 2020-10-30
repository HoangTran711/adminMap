import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function AddFrame({
  floors,
  setFloors,
  closeFloors,
  isEditing,
  floor,
  setIsEditing,
}) {
  const [floorNumber, setFloorNumber] = useState(0);
  const [floorFormal, setFloorFormal] = useState('');
  const [specialRoom, setSpecialRoom] = useState(null);
  const onClose = () => {
    document.querySelector('.add-frame').style.display = 'none';
  };
  const onSubmit = () => {
    // const x = {"name": "Phòng học thanh niên","description": "Phòng học thanh niên","qty_search": 0,"accumulateQtySearch": 0,"preview2DImg": [],"coordinates": [106.7719688208835, 10.851035708719962]};
    let temp1 = [];
    temp1.push(JSON.parse(specialRoom));
    setIsEditing(false);
    let temp = floors;
    temp.push({
      nth: floorNumber,
      formalRooms: floorFormal,
      specialRooms: temp1,
    });
    setFloors(temp);
    closeFloors();
    onClose();
  };
  return (
    <div className="add-frame">
      <div className="add-frame__header">
        {isEditing ? <h1>Add Floor</h1> : <h1>Edit Floor</h1>}
        <FontAwesomeIcon onClick={onClose} className="icon" icon={faTimes} />
      </div>
      <div className="txt-frame">
        <input
          onChange={(e) => {
            setFloorNumber(e.target.value);
          }}
          className="txt-frame__input"
          value={floorNumber}
          type="text"
          placeholder="Floor Number"
        />
        <input
          onChange={(e) => {
            setFloorFormal(e.target.value);
          }}
          value={floorFormal}
          className="txt-frame__input"
          type="text"
          placeholder="Formal Room"
        />
        <textarea
          placeholder="Special Room"
          className="text-area"
          onChange={(e) => {
            setSpecialRoom(e.target.value);
          }}
        ></textarea>
        <div onClick={onSubmit} className="btn">
          <a>Add Floor</a>
        </div>
      </div>
    </div>
  );
}

export default AddFrame;

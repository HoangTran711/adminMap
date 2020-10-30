import React from 'react';
import AddFrame from './AddFrame/AddFrame';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

function Floors({ floor, setFloors }) {
  console.log(floor);
  const onClose = () => {
    document.querySelector('.floors').style.display = 'none';
  };
  const onOpen = () => {
    document.querySelector('.add-frame').style.display = 'block';
  };
  return (
    <div className="floors">
      <AddFrame setFloors={setFloors} floors={floor} closeFloors={onClose} />
      <div className="floors__heading">
        <h1>Floors</h1>
        <div className="close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} className="icon" />
        </div>
      </div>
      <ul className="floors__list">
        {floor.map((a, index) => {
          return (
            <li key={index} className="item">
              <div className="item__heading">
                <h1 className="label">Floor: {a.nth} </h1>
                <div className="icon">
                  <FontAwesomeIcon className="edit" icon={faEdit} />
                  <FontAwesomeIcon className="delete" icon={faTrashAlt} />
                </div>
              </div>
              <div className="formal-room">
                <span className="formal-room__label">Formal Room:</span>
                <p className="content"> {a.formalRooms}</p>
              </div>
              <ul className="special-room">
                {a.specialRooms.map((a, index) => {
                  return (
                    <li key={index} className="special-room__item">
                      <span>Special room {index + 1}:</span>
                      <p>{a.name}</p>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <div className="btn">
        <a className="link" onClick={onOpen}>
          Add Floor
        </a>
      </div>
    </div>
  );
}

export default Floors;

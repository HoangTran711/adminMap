import React from 'react';

function Question({ _id, clickClose }) {
  const noClick = () => {
    document.querySelector('.question').style.opacity = 0;
    document.querySelector('.question').style.visibility = 'hidden';
  };
  const yesClick = () => {
    fetch('http://localhost:8080/admin/' + _id, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((result) => clickClose())
      .catch((err) => console.log(err));
    document.location.reload();
  };
  return (
    <div className="question">
      <div className="header">
        <h1> Warning! </h1>
      </div>
      <div className="main">
        <h2 className="title"> Are you sure ? </h2>
        <div className="answer">
          <div className="yes" onClick={yesClick}>
            <a href="#" className="link">
              {' '}
              Yes{' '}
            </a>
          </div>
          <div className="no" onClick={noClick}>
            <a className="link"> No </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;

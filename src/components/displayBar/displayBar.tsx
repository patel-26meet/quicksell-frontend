import React, { useState } from "react";
import "./displayBar.css";
import { ReactComponent as DisplayIcon} from '../../assets/icons_FEtask/Display.svg'
import { ReactComponent as Down} from '../../assets/icons_FEtask/down.svg'

const DisplayBar = ({ grouping, ordering, onGroupingChange, onOrderingChange }) => {
  const [displayOnClick, setDisplayOnClick] = useState(false);

  const handleGroupValue = (e, isGrouping) => {
    const value = e.target.value;
    if (isGrouping) {
      onGroupingChange(value);
    } else {
      onOrderingChange(value);
    }
    setDisplayOnClick(false);
  };

  return (
    <div className="top-header">
      <div className="displayButton">
        <button
          className="display-btn"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          <DisplayIcon className="displayIcon"/> Display <Down className="downIcon"/>
        </button>
        {displayOnClick && (
          <div className="dropOnClick">
            <div className="selectGroup">
              <span className="label">Grouping</span>
              <select
                value={grouping}
                onChange={(e) => handleGroupValue(e, true)}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup">
              <span className="label">Ordering</span>
              <select
                value={ordering}
                onChange={(e) => handleGroupValue(e, false)}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayBar;

import React from "react";
import "./ConfirmDialog.scss";

function ConfirmDialog({ title, subtitle, onConfirm, onCancel }) {
    console.log(onConfirm);
  return (
    <div className="confirm-dialog-container">
      <div className="confirm-dialog">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
}

export default ConfirmDialog;
import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Typography } from "@material-ui/core";

const SemCard = ({ i, onClick, active, disabled }) => {
  return (
    <div
      className={`card ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
      onClick={disabled ? null : () => onClick(i)}
    >
      <div className="card-menu">
        <MenuBookIcon />
        <Typography
          variant="h5"
          style={{
            fontWeight: 300,
            color: disabled ? "gray" : "white",
            zIndex: "3",
            padding: "1vmax 2vmax",
          }}
        >
          {disabled ? `Semester ${i} (Coming Soon)` : `Semester ${i}`}
        </Typography>
      </div>
    </div>
  );
};

export default SemCard;

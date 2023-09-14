import React, { Fragment } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Typography } from "@material-ui/core";

const SemCard = ({ i, onClick, active }) => {
  return (
    <Fragment>
      <div
        className={`card ${active ? "active" : ""}`}
        onClick={() => onClick(i)}
      >
        <div className="card-menu">
          <MenuBookIcon />
          <Typography
            variant="h5"
            style={{
              fontWeight: 300,
              color: "white",
              zIndex: "3",
              padding: "1vmax 2vmax",
            }}
          >
            Semester {i}
          </Typography>
        </div>
      </div>
    </Fragment>
  );
};

export default SemCard;

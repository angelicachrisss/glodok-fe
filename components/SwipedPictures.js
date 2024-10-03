import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Paper, Box } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  "/static/bannerglodok/glodok1.png",
  "/static/bannerglodok/glodok2.png",
  "/static/bannerglodok/glodok3.png",
];

const SwipedPictures = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: "100%", margin: "auto", overflow: "hidden" }}
    >
      <Paper sx={{ position: "relative", overflow: "hidden" }}>
        <AutoPlaySwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          axis="x"
          enableMouseEvents
        >
          {images.map((img, index) => (
            <div
              key={index}
              style={{
                height: "400px", // Set fixed height for the container
                position: "relative",
              }}
            >
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Maintain aspect ratio
                    display: "block",
                    maxWidth: "100%", // Ensure it doesn't exceed container width
                    maxHeight: "100%", // Ensure it doesn't exceed container height
                  }}
                  src={img}
                  alt={`Step ${index}`}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </Paper>
    </Box>
  );
};

export default SwipedPictures;

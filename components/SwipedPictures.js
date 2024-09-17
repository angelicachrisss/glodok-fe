import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Paper, Typography } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  "/static/bannerglodok/glodok1.png",
  "/static/bannerglodok/glodok2.png",
  "/static/bannerglodok/glodok3.png",
  
  // "https://storage.jakarta-tourism.go.id/public/articles/6e1e1472-adf4-479c-be63-b5109266f9b4.jpg",
  // "https://asset.kompas.com/crops/G7xZBGRWwpO8pCo3hLVuoIaEzeg=/0x16:1600x1082/750x500/data/photo/2022/02/01/61f8c384ab993.jpeg",
  // "https://asset.kompas.com/crops/pWbSOD8088vEpCFrRO9KC-BoYFw=/0x0:0x0/750x500/data/photo/2023/01/19/63c96eb935248.jpg",
];

const SwipedPictures = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div>
      <Paper sx={{ flexGrow: 1, maxWidth: 1900, margin: "auto" }}>
        <AutoPlaySwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          axis="x"
        >
          {images.map((img, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                height: 400, //buat atur tinggi lebarnya carousell
                overflow: "hidden",
              }}
            >
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Mengisi area kontainer tanpa distorsi
                    display: "block",
                    maxWidth: "1900px",
                  }}
                  src={img}
                  alt={`Step ${index}`}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </Paper>
      {/* <Typography variant="caption" align="center">{`Photo ${
        activeStep + 1
      } of ${images.length}`}</Typography> */}
    </div>
  );
};

export default SwipedPictures;

import React, { useCallback, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Paper, Box } from "@mui/material";
import api from "../services/api";
import { useMediaQuery } from "@mui/material"; // Import useMediaQuery

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const SwipedPictures = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [images, setImages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  
  const isMobile = useMediaQuery("(max-width:600px)"); // Define mobile breakpoint

  const getFotoBeranda = async () => {
    try {
      const response = await api.getFotoBeranda();
      const { data } = response.data;

      // Extract image URLs from the response
      const imageUrls = data
        .map((item) => item.fotoberanda_gambar_url)
        .filter((url) => url);
      setImages(imageUrls);
    } catch (error) {
      // displayToast("error", error.message);
    }
  };

  useEffect(() => {
    if (!isFetching) {
      getFotoBeranda();
      setIsFetching(true);
    }
  }, [isFetching]);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "100%",
        margin: "auto",
        overflow: "hidden",
        mt: { xs: -1 },
      }}
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
                height: isMobile ? "300px" : "500px", // Adjust height based on device
                position: "relative",
              }}
            >
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "100%",
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

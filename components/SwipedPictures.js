import React, { useCallback, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Paper, Box, debounce } from "@mui/material";
import api from "../services/api";
import useToast from "../utils/toast";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const SwipedPictures = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [images, setImages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const debounceFotoBeranda = useCallback(debounce(getFotoBeranda, 400), []);

  async function getFotoBeranda() {
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
  }

  useEffect(() => {
    if (!isFetching) {
      debounceFotoBeranda();
      setIsFetching(true);
    }
  }, []);

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

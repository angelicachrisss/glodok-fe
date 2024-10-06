import { Box, debounce, Typography } from "@mui/material";
import Layout from "../../components/Layout";
import useToast from "../../utils/toast";
import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";

const VirtualTour = () => {
  const [displayToast] = useToast();
  const [isFetching, setIsFetching] = useState(false);
  const [tempData, setTempData] = useState("");
  const [valueMaps, setValueMaps] = useState(
    tempData === "" || tempData === null || tempData === undefined
      ? ""
      : tempData
  );

  const debounceMaps = useCallback(debounce(getMaps, 400), []);

  async function getMaps() {
    try {
      const response = await api.getMaps();
      const { data } = response.data;

      setTempData(data.maps_link);
    } catch (error) {
      displayToast("error", error.message);
    }
  }

  useEffect(() => {
    if (!isFetching) {
      debounceMaps();
      setIsFetching(true);
    }
  }, []);

  useEffect(() => {
    setValueMaps(tempData);
  }, [tempData]);

  return (
    <Layout>
      <Box sx={{ width: "100%", height: "100vh", mb: -2 }}>
        {/* <Typography
          variant="h5"
          align="center"
          sx={{ mb: 2, mt: 3, fontWeight: 600 }}
        >
          Virtual Tour
        </Typography> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            overflow: "hidden", // Ensure no overflow from the iframe
          }}
        >
          <Box
            component="iframe"
            // src={
            //   valueMaps ||
            //   "https://www.google.com/maps/embed?pb=!4v1727359163523!6m8!1m7!1seiurS4NnFd8yKG1zpMvKAg!2m2!1d-6.142562151937587!2d106.8146603099731!3f306.1913928706233!4f-0.8199002550741596!5f0.7820865974627469"
            // }
            src={valueMaps}
            sx={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default VirtualTour;

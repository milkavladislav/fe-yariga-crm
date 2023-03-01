import { Add } from "@mui/icons-material";
import { Box, Stack, Typography } from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { CustomButton } from "components";
import React from "react";

const AllProperties = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          All Properties
        </Typography>
        <CustomButton
          title="Add property"
          backgroundColor="#475be8"
          color="#fcfcfc"
          handleClick={() => navigate("/properties/create")}
          icon={<Add />}
        ></CustomButton>
      </Stack>
    </Box>
  );
};

export default AllProperties;

import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import { Box, Stack, Typography } from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { CustomButton, PropertyCard } from "components";
import React from "react";

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable();

  console.log(data);

  const allProperties = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

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
      <Box
        mt="20px"
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        {allProperties.map((property) => (
          <PropertyCard
            id={property._id}
            title={property.title}
            location={property.location}
            price={property.price}
            photo={property.photo}
            key={property._id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllProperties;

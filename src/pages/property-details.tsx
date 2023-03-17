import { Call, Delete, Edit, Message, Place, Star } from "@mui/icons-material";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { Box, Button, Stack, Typography } from "@pankod/refine-mui";
import { useNavigate, useParams } from "@pankod/refine-react-router-v6";
import React from "react";

import map from "../assets/map.png";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;

  const propertyDetails = data?.data ?? {};

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const isCurrentUser = user.email === propertyDetails.creator.email;

  const handleDeleteProperty = () => {
    const response = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (response) {
      mutate(
        { resource: "properties", id: id as string },
        {
          onSuccess: () => {
            navigate("/properties");
          },
        }
      );
    }
  };

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#fcfcfc"
      width="fit-content"
    >
      <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          Details
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          gap={4}
        >
          <Box flex={1} maxWidth={746}>
            <img
              src={propertyDetails.photo}
              alt={propertyDetails.title}
              height={546}
              style={{ objectFit: "cover", borderRadius: "10px" }}
              className="property_details-img"
            />
            <Box mt="15px">
              <Stack
                direction="row"
                justifyContent="space-between"
                flexWrap="wrap"
                alignItems="center"
              >
                <Typography
                  fontSize={18}
                  fontWeight={500}
                  color="#11142d"
                  textTransform="capitalize"
                >
                  {propertyDetails.propertyType}
                </Typography>
                <Box>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={`star-${star}`} sx={{ color: "#f2c94c" }} />
                  ))}
                </Box>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                flexWrap="wrap"
                alignItems="center"
              >
                <Box>
                  <Typography
                    fontSize={22}
                    fontWeight={600}
                    color="#11142d"
                    textTransform="capitalize"
                  >
                    {propertyDetails.title}
                  </Typography>
                  <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                    <Place sx={{ color: "#808191" }} />
                    <Typography fontSize={14} color="#808191">
                      {propertyDetails.location}
                    </Typography>
                  </Stack>
                </Box>
                <Box>
                  <Typography fontSize={22} fontWeight={600} color="#11142d">
                    Price
                  </Typography>
                  <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                    <Typography fontSize={26} fontWeight={800} color="#475BE8">
                      ${propertyDetails.price}
                    </Typography>
                    <Typography fontSize={18} color="#808191">
                      For One Day
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <Typography fontSize={22} fontWeight={600} color="#11142d" mt={2}>
                Description
              </Typography>
              <Typography fontSize={16} color="#808191" mt={1}>
                {propertyDetails.description}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box
              border="1px solid #E4E4E4"
              borderRadius="10px"
              width="fit-content"
            >
              <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                padding="20px"
                mt={2}
              >
                <img
                  src={propertyDetails.creator.avatar}
                  alt={propertyDetails.creator.name}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                />
                <Typography fontSize={22} fontWeight={700} color="#11142d">
                  {propertyDetails.creator.name}
                </Typography>
                <Typography fontSize={16} color="#808191">
                  Agent
                </Typography>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <Place sx={{ color: "#808191" }} />
                  <Typography fontSize={14} color="#808191">
                    {propertyDetails.location}
                  </Typography>
                </Stack>
                <Typography
                  fontSize={20}
                  color="#11142d"
                  fontWeight={700}
                  mt={1}
                >
                  {propertyDetails.creator.allProperties.length || 1} Properties
                </Typography>
                <Stack mt={2} direction="row" alignItems="center" gap={0.5}>
                  {isCurrentUser ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Edit />}
                        onClick={() =>
                          navigate(`/properties/edit/${propertyDetails._id}`)
                        }
                        style={{ width: "150px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteProperty}
                        startIcon={<Delete />}
                        style={{ width: "150px" }}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#475BE8", width: "150px" }}
                        startIcon={<Message />}
                      >
                        Message
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#2ED480", width: "150px" }}
                        startIcon={<Call />}
                      >
                        Call
                      </Button>
                    </>
                  )}
                </Stack>
              </Stack>
            </Box>
            <Box mt={2} width="350px">
              <img src={map} width="100%" alt="map" />
              <Button variant="contained" color="primary" fullWidth>
                Book Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetails;

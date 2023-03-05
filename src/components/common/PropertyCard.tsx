import React from "react";
import { Place } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@pankod/refine-mui";
import { PropertyCardProps } from "interfaces/property";
import { Link } from "@pankod/refine-react-router-v6";

const PropertyCard = ({
  id,
  title,
  location,
  photo,
  price,
}: PropertyCardProps) => {
  return (
    <Card
      component={Link}
      to={`/properties/${id}`}
      sx={{
        maxWidth: "330px",
        padding: "10px",
        "&:hover": { boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1" },
        cursor: "pointer",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        width="100%"
        height={210}
        image={photo}
        alt="card image"
        sx={{ borderRadius: "10px" }}
      />
      <CardContent
        sx={{
          paddingX: "5px",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "space-between",
          textDecoration: "none",
        }}
      >
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#11142d">{title}</Typography>
          <Stack direction="row" alignItems="flex-start" gap={0.5}>
            <Place sx={{ fontSize: 18, color: "#11142d", marginTop: 0.5 }} />
            <Typography fontSize={14} color="#808191">{location}</Typography>
          </Stack>
        </Stack>
        <Box px={1.5} py={0.5} borderRadius={1} bgcolor="#dadefa" height="fit-content">
          <Typography fontSize={12} fontWeight={600} color="#475be8">
            ${price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;

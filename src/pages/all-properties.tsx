import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { CustomButton, PropertyCard } from "components";
import React, { useMemo } from "react";

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  console.log(data);

  const allProperties = data?.data ?? [];

  const currentPrice = sorter.find((item) => item.field === "price")?.order;

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  };

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : []
    );

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
      propertyType:
        logicalFilters.find((item) => item.field === "propertyType")?.value ||
        "",
    };
  }, [filters]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allProperties.length
              ? "There are no properties"
              : "All Properties"}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box
              display="flex"
              flexWrap="wrap"
              gap={2}
              mb={{ xs: "20px", sm: 0 }}
            >
              <CustomButton
                handleClick={() => {
                  toggleSort("price");
                }}
                title={`Sort price ${currentPrice === "asc" ? "↑" : "↓"}`}
                color="#fcfcfc"
                backgroundColor="#475be8"
              />
              <TextField
                variant="outlined"
                placeholder="Search by title"
                color="info"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "title",
                      operator: "contains",
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              />
              <Select
                variant="outlined"
                color="info"
                value={currentFilterValues.propertyType}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: "propertyType",
                        operator: "eq",
                        value: e.target.value,
                      },
                    ],
                    "replace"
                  );
                }}
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
              >
                <MenuItem value="">All</MenuItem>
                {[
                  "Apartment",
                  "House",
                  "Villa",
                  "Farmhouse",
                  "Studio",
                  "Chalet",
                  "Condos",
                ].map((item) => (
                  <MenuItem key={item} value={item.toLowerCase()}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
      {allProperties.length > 0 && (
        <Box mt={3} display="flex" gap={2} flexWrap="wrap">
          <CustomButton
            handleClick={() => setCurrent((prev) => prev - 1)}
            title="Previous"
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />
          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems="center"
            gap="5px"
          >
            Page{" "}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>
          <CustomButton
            handleClick={() => setCurrent((prev) => prev + 1)}
            title="Next"
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            onChange={(e) =>
              setPageSize(e.target.value ? Number(e.target.value) : 10)
            }
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={10}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize}>
                Show {pageSize}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllProperties;

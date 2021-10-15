import React from "react";
import { Box, Typography } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

function RatingFilter({ setRating }) {
  return (
    <Box sx={{ width: { xs: "80%", sm: "30%" }, ml: 2, mb: 4 }}>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        Ratings
      </Typography>
      <Box
        onClick={() => setRating(0)}
        sx={{ ml: 4, "&:hover": { opacity: 0.8, cursor: "pointer" } }}
      >
        {Array(5)
          .fill()
          .map((_, i) => (
            <StarBorder key={i} />
          ))}
      </Box>
      <Box
        onClick={() => setRating(1)}
        sx={{ ml: 4, "&:hover": { opacity: 0.8, cursor: "pointer" } }}
      >
        {Array(1)
          .fill()
          .map((_, i) => (
            <Star sx={{ color: "#ff6d75" }} key={i} />
          ))}
        {Array(4)
          .fill()
          .map((_, i) => (
            <StarBorder key={i} />
          ))}
      </Box>
      <Box
        onClick={() => setRating(2)}
        sx={{ ml: 4, "&:hover": { opacity: 0.8, cursor: "pointer" } }}
      >
        {Array(2)
          .fill()
          .map((_, i) => (
            <Star sx={{ color: "#ff6d75" }} key={i} />
          ))}
        {Array(3)
          .fill()
          .map((_, i) => (
            <StarBorder key={i} />
          ))}
      </Box>
      <Box
        onClick={() => setRating(3)}
        sx={{ ml: 4, "&:hover": { opacity: 0.8, cursor: "pointer" } }}
      >
        {Array(3)
          .fill()
          .map((_, i) => (
            <Star sx={{ color: "#ff6d75" }} key={i} />
          ))}
        {Array(2)
          .fill()
          .map((_, i) => (
            <StarBorder key={i} />
          ))}
      </Box>
      <Box
        onClick={() => setRating(4)}
        sx={{ ml: 4, "&:hover": { opacity: 0.8, cursor: "pointer" } }}
      >
        {Array(4)
          .fill()
          .map((_, i) => (
            <Star sx={{ color: "#ff6d75" }} key={i} />
          ))}
        {Array(1)
          .fill()
          .map((_, i) => (
            <StarBorder key={i} />
          ))}
      </Box>
      <Box
        onClick={() => setRating(5)}
        sx={{ ml: 4, "&:hover": { opacity: 0.8, cursor: "pointer" } }}
      >
        {Array(5)
          .fill()
          .map((_, i) => (
            <Star sx={{ color: "#ff6d75" }} key={i} />
          ))}
      </Box>
    </Box>
  );
}

export default RatingFilter;

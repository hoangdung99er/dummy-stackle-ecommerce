import React from "react";
import { Box, Typography, Avatar, Rating, Paper } from "@mui/material";

function ReviewCard({ review }) {
  return (
    <Box
      sx={{
        m: 3,
        height: "100%",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: { xs: 350, sm: 270, md: 350 },
          height: "100%",
          p: 2,
        }}
        elevation={3}
      >
        <Avatar
          src="https://images.pexels.com/photos/7166173/pexels-photo-7166173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="User"
        />
        <Typography variant="body1">{review?.name}</Typography>
        <Rating
          name="half-rating-read-only"
          defaultValue={review?.rating}
          readOnly
          sx={{ "& .MuiRating-iconFilled": { color: "#ff6d75" } }}
        />
        <Typography variant="body2">
          {review?.comment} Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Laboriosam sit nam facilis fugit, odio cum et modi ipsa, iure
          quidem, illo id deserunt beatae placeat error. Et qui autem, ea illo
          eius cupiditate, adipisci nesciunt pariatur earum vitae voluptate
          ipsam aliquam nobis voluptatibus quisquam rem amet expedita obcaecati.
          Odio, aut?{" "}
        </Typography>
      </Paper>
    </Box>
  );
}

export default ReviewCard;

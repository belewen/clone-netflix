import React from "react";
import NetflixRow from "./NetflixRow";
import NetflixHeader from "./NetflixHeader";

const NetflixMovies = () => {
  return (
    <div>
      <NetflixHeader mediaType="movie" />
      <NetflixRow
        category="popular"
        media="movie"
        sizeImage="w500"
        title="Films populaires"
        formatImage="large"
      />
      <NetflixRow
        category="top_rated"
        media="movie"
        sizeImage="w500"
        title="Films les mieux notés"
        formatImage="large"
      />
    </div>
  );
};

export default NetflixMovies;

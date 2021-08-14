import styled from "styled-components";
/* image */
import coverImage from "../../media/coverImage.jpg";

export const CoverImage = styled.div`
    background-image: url(${coverImage});
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    @media (max-width: 768px) {
    display: none;
  }
`;

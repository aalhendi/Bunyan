/* Library */
import styled from "styled-components";
/* image */
import coverImage from "../../media/coverImage.jpg";

/* Left Side Image Style on the Login and register Page */
export const CoverImage = styled.div`
    background-image: url(${coverImage});
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    @media (max-width: 768px) {
    display: none;
  }
`;

/* Logo Image Size */
export const Logo = styled.img`
 max-width: 50px;
`;


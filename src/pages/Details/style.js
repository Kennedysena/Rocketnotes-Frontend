import styled from "styled-components";

import { DEVICE_BREAKPOINTS } from "../../styles/deviceBreakpoints";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 10.5rem auto;
  grid-template-areas: "header" "content";

  > main {
    grid-area: content;
    overflow-y: scroll;
    padding: 6.4rem 0;
  }

  @media (max-width: ${DEVICE_BREAKPOINTS.MD}) {
    > main {
      padding: 2rem 0;
      overflow-y: none;
    }
  }

`;

export const Links = styled.ul`
  list-style: none;

  > li {
    margin-top: 1.2rem;
  }

  a {
    color: ${({ theme }) => theme.COLORS.WHITE};
    text-decoration: none;
  }
`;

export const Content = styled.div`
  max-width: 55rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > button:first-child {
    align-self: end;
    font-size: 2rem;
  }

  > h1 {
    font-size: 3.6rem;
    font-weight: 500;
    padding-top: 4rem;
    //padding-top: 6.4rem;
  }

  > p {
    font-size: 1.6rem;
    margin-top: 1.6rem;
    text-align: justify;
  }


  @media (max-width: ${DEVICE_BREAKPOINTS.MD}) {
    padding: 0 3rem;

     > button:first-child {
    align-self: end;
    font-size: 2rem;
    margin-top: 2.1rem;
  }
  }
`;

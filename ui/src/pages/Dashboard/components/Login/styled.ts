import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Theme } from "@mui/material/styles";
import { Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";

export const LoginBlock = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  margin: 0px auto;
  max-width: 500px;
  width: 100%;
`;

export const LoginForm = styled(Box)`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    text-align: center;
    color: "@headlineColor";
  }

  p {
    font-size: 0.65rem;
    color: #666;
    text-align: center;
  }
`;

export const InputGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 1.3rem;
`;

export const ForgetPasswordLink = styled(Link)`
  margin-left: auto;
  text-decoration: none;
  font-size: 0.7rem;
  margin-top: 5px;
  color: #999;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledDivider = styled(Divider)`
  margin: 30px 0;
  color: #999;
  text-align: center;
  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
    margin: auto 10px;
  }
`;
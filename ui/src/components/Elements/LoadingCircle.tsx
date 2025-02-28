import React, { CSSProperties, memo } from "react";
import styled from "@emotion/styled";

type LoadingCircleProps = {
  size?: number; // Size of the spinner
  color?: string; // Color of the dots
  style?: CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

const StyledDotCircle = styled.div<{ size: number; color: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: relative;
  animation: sk-dotcircle 2.5s infinite linear both;

  .sk-chase-dotcircle {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: sk-chase-dotcircle 2s infinite ease-in-out both;
  }

  .sk-chase-dotcircle:before {
    content: "";
    display: block;
    width: 25%;
    height: 25%;
    background-color: ${({ color }) => color};
    border-radius: 100%;
    animation: sk-chase-dotcircle-before 2s infinite ease-in-out both;
  }

  ${Array.from({ length: 6 })
    .map(
      (_, i) => `
    .sk-chase-dotcircle:nth-of-type(${i + 1}) {
      animation-delay: -${1.1 - i * 0.1}s;
    }
    .sk-chase-dotcircle:nth-of-type(${i + 1}):before {
      animation-delay: -${1.1 - i * 0.1}s;
    }
  `
    )
    .join("")}

  @keyframes sk-dotcircle {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dotcircle {
    80%, 100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dotcircle-before {
    50% {
      transform: scale(0.4);
    }
    100%, 0% {
      transform: scale(1);
    }
  }
`;

const LoadingCircle: React.FC<LoadingCircleProps> = ({
  size = 40,
  color = "#0492f2",
  style,
  ...props
}) => {
  return (
    <StyledDotCircle size={size} color={color} style={style} {...props}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="sk-chase-dotcircle"></div>
      ))}
    </StyledDotCircle>
  );
};

export default memo(LoadingCircle);
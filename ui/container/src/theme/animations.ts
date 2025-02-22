import { keyframes } from "@emotion/react";

// Function to generate keyframes dynamically based on the color
export const rippleAnimation = (color: string) => keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(${color}, 0.3), 0 0 0 1em rgba(${color}, 0.3),
      0 0 0 3em rgba(${color}, 0.3), 0 0 0 5em rgba(${color}, 0.3);
  }
  100% {
    box-shadow: 0 0 0 1em rgba(${color}, 0.3), 0 0 0 3em rgba(${color}, 0.3),
      0 0 0 5em rgba(${color}, 0.3), 0 0 0 8em rgba(${color}, 0);
  }
`;

// Flip animation
export const flip = keyframes`
  0% {
    transform: perspective(400px) scaleX(1) translateZ(0) rotateY(-1turn);
    animation-timing-function: ease-out;
  }
  40% {
    transform: perspective(400px) scaleX(1) translateZ(150px) rotateY(-190deg);
    animation-timing-function: ease-out;
  }
  50% {
    transform: perspective(400px) scaleX(1) translateZ(150px) rotateY(-170deg);
    animation-timing-function: ease-in;
  }
  80% {
    transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translateZ(0) rotateY(0deg);
    animation-timing-function: ease-in;
  }
  100% {
    transform: perspective(400px) scaleX(1) translateZ(0) rotateY(0deg);
    animation-timing-function: ease-in;
  }
`;

// Pulse animation
export const pulse = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  80% {
    opacity: 0;
    transform: scale(2);
  }
  100% {
    opacity: 0;
    transform: scale(3);
  }
`;

// Dropdown menu fade-in animation
export const dropdownMenuFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Dropdown menu move-down animation
export const dropdownMenuMoveDown = keyframes`
  0% {
    margin-top: -10px;
  }
  100% {
    margin-top: 0;
  }
`;

// Dropdown menu move-up animation
export const dropdownMenuMoveUp = keyframes`
  0% {
    margin-top: 10px;
  }
  100% {
    margin-top: 0;
  }
`;

// Blobs animation
export const blobs = (left: string, right: string) => keyframes`
  0% {
    opacity: 0;
    transform: scale(0) translate(${left}, -50%);
  }
  1% {
    opacity: 1;
  }
  35%, 65% {
    opacity: 1;
    transform: scale(0.9) translate(-50%, -50%);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(0) translate(${right}, -50%);
  }
`;

// Blob-grow animation
export const blobGrow = keyframes`
  0%, 39% {
    transform: scale(0) translate(-50%, -50%);
  }
  40%, 42% {
    transform: scale(1, 0.9) translate(-50%, -50%);
  }
  43%, 44% {
    transform: scale(1.2, 1.1) translate(-50%, -50%);
  }
  45%, 46% {
    transform: scale(1.3, 1.2) translate(-50%, -50%);
  }
  47%, 48% {
    transform: scale(1.4, 1.3) translate(-50%, -50%);
  }
  52% {
    transform: scale(1.5, 1.4) translate(-50%, -50%);
  }
  54% {
    transform: scale(1.7, 1.6) translate(-50%, -50%);
  }
  58% {
    transform: scale(1.8, 1.7) translate(-50%, -50%);
  }
  68%, 70% {
    transform: scale(1.7, 1.5) translate(-50%, -50%);
  }
  78% {
    transform: scale(1.6, 1.4) translate(-50%, -50%);
  }
  80%, 81% {
    transform: scale(1.5, 1.4) translate(-50%, -50%);
  }
  82%, 83% {
    transform: scale(1.4, 1.3) translate(-50%, -50%);
  }
  84%, 85% {
    transform: scale(1.3, 1.2) translate(-50%, -50%);
  }
  86%, 87% {
    transform: scale(1.2, 1.1) translate(-50%, -50%);
  }
  90%, 91% {
    transform: scale(1, 0.9) translate(-50%, -50%);
  }
  92%, 100% {
    transform: scale(0) translate(-50%, -50%);
  }
`;
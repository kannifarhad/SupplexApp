export const getCountryFlagIMG = ({ country, width = 20 }: { country: string; width?: number }) => (
  <img
    loading="lazy"
    width={width}
    srcSet={`https://flagcdn.com/w40/${country}.png 2x`}
    src={`https://flagcdn.com/w20/${country}.png`}
    alt=""
  />
);
export const randomizeBackground = () => {
  const randomizeColor =
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  return randomizeColor;
};

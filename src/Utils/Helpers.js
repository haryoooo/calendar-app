export const dateStyling = (idx) => {
  if (idx > 5 && idx < 37) {
    return {
      position: "absolute",
      fontWeight: "bold",
      zIndex: 2,
    };
  }
  return {
    position: "absolute",
    textAlign: "end",
    color: "#d9dada",
    fontWeight: "bold",
    zIndex: 2,
  };
};

export const eventStyling = (value, hex) => {
  switch (value) {
    case 0:
      return {
        position: "relative",
        zIndex: 1,
        display: "flex",
        justifyContent: "space-between",
        textAlign: "left",
        fontSize: "11px",
      };
    case 1:
      return {
        position: "relative",
        zIndex: 1,
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: hex,
        textAlign: "left",
        fontSize: "11px",
      };
    default:
      return null;
  }
};

export const calendarBoxStyling = (idx, innerWidth) => {
  if (idx > 5 && idx < 37) {
    return { cursor: "pointer", border: "1px solid black", width: innerWidth < 1500 ? "10rem" : "12rem" };
  }
  return {
    borderLeft: "1px solid #D9DADA",
    borderTop: "1px solid black",
    borderRight: "1px solid #D9DADA",
    borderBottom: "1px solid black",
    width: innerWidth < 1500 ? "10rem" : "12rem",
    minHeight: innerWidth > 1500 ? "6rem" : "5rem",
  };
};

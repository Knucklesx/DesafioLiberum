export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "nb" | "xxx";

export const buttonSize = {
  xs: {
    borderRadius: "4px",
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  sm: {
    borderRadius: "6px",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "12px",
    paddingRight: "12px",
  },
  md: {
    borderRadius: "8px",
    paddingTop: "10px",
    // paddingBottom: "10px",
    paddingLeft: "14px",
    paddingRight: "14px",
  },
  lg: {
    borderRadius: "10px",
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  xl: {
    borderRadius: "12px",
    paddingTop: "16px",
    paddingBottom: "16px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  nb: {
    borderRadius: "12px",
    paddingTop: "160px",
    paddingBottom: "16px",
    paddingLeft: "20px",
    paddingRight: "20px",
    width: "130px",
    height: "25px",
    padding: "1.02px",
    gap: "0px",
  },
  xxx: {
    borderRadius: "12px",
    paddingTop: "16px",
    paddingBottom: "16px",
    paddingLeft: "20px",
    paddingRight: "20px",
    fontSize: "45px",
  },
};

import React from "react";
import "./SectionTitle.css";

const SectionTitle = ({ children, dark }) => {
  const titleClassName = `section-title ${
    dark ? "section-title_type_dark" : ""
  }`;

  return <h2 className={titleClassName}>{children}</h2>;
};

export default SectionTitle;

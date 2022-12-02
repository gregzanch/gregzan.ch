import { useEffect } from "react";
import router from "next/router";

const Resume = () => {
  useEffect(() => {
    router.replace("/resume.pdf");
  }, []);
  return <div />;
};

export default Resume;

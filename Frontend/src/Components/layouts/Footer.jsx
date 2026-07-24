import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <div className="static  w-full bg-[#ebebeb]  bottom-0 ">
      <div className="my-3">
        <span className="mx-2">
          <FacebookIcon />
        </span>
        <span className="mx-2">
          <InstagramIcon />
        </span>
        <span className="mx-2">
          <LinkedInIcon />
        </span>
      </div>
      <div className="my-3">&copy;Wanderlust Private Limited</div>
      <div className="my-3">Privacy
Terms</div>
    </div>
  );
}

export default Footer;

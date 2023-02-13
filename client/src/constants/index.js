import {
  logout,
  payment,
  profile,
  withdraw,
  dashboard,
  createCampaign,
} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
];

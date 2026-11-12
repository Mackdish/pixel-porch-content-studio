import exterior from "@/assets/photos/site-exterior.jpg";
import cablingDesk from "@/assets/photos/site-cabling-desk.jpg";
import teamDrill from "@/assets/photos/site-team-drill.jpg";
import socketInstall from "@/assets/photos/site-socket-install.jpg";
import ladderRack from "@/assets/photos/site-ladder-rack.jpg";
import rackCabinet from "@/assets/photos/site-rack-cabinet.jpg";
import teamBriefing from "@/assets/photos/site-team-briefing.jpg";
import trunkingVideo from "@/assets/photos/site-trunking-walkthrough.mp4";
import trunkingPoster from "@/assets/photos/site-trunking-walkthrough-poster.jpg";
import teamVideo from "@/assets/photos/site-team-install.mp4";
import teamPoster from "@/assets/photos/site-team-install-poster.jpg";

/** Real photos from the Networking Installations project. */
export const PHOTOS = {
  exterior: {
    src: exterior,
    width: 1280,
    height: 720,
    alt: "Single-storey building with a blue roof and the Clisanco team in high-visibility vests standing outside",
    caption: "The installation site",
  },
  cablingDesk: {
    src: cablingDesk,
    width: 1280,
    height: 720,
    alt: "Clisanco technician in a branded vest running network cable beneath a workstation desk",
    caption: "Running cable beneath the workstation desks",
  },
  teamDrill: {
    src: teamDrill,
    width: 1280,
    height: 720,
    alt: "The Clisanco installation team on site in hard hats and branded high-visibility vests, one holding a drill",
    caption: "The team on site",
  },
  socketInstall: {
    src: socketInstall,
    width: 720,
    height: 1280,
    alt: "Technician seated on a bucket fitting a network socket at a workstation",
    caption: "Fitting a socket at a workstation",
  },
  ladderRack: {
    src: ladderRack,
    width: 720,
    height: 1280,
    alt: "Two Clisanco technicians on a ladder working on a wall-mounted network cabinet",
    caption: "Working on the wall-mounted network cabinet",
  },
  rackCabinet: {
    src: rackCabinet,
    width: 1280,
    height: 720,
    alt: "Wall-mounted network cabinet with a bundle of network cables run into it",
    caption: "Wall-mounted network cabinet with the cabling run in",
  },
  teamBriefing: {
    src: teamBriefing,
    width: 720,
    height: 1280,
    alt: "The Clisanco team gathered in a room in hard hats and high-visibility vests",
    caption: "The team gathered on site",
  },
} as const;

export type GalleryItem =
  | { type: "image"; src: string; width: number; height: number; alt: string; caption: string }
  | { type: "video"; src: string; poster: string; width: number; height: number; alt: string; caption: string };

const image = (p: (typeof PHOTOS)[keyof typeof PHOTOS]): GalleryItem => ({ type: "image", ...p });

/** Gallery for the Projects page, in display order. */
export const NETWORKING_GALLERY: GalleryItem[] = [
  image(PHOTOS.exterior),
  image(PHOTOS.cablingDesk),
  {
    type: "video",
    src: trunkingVideo,
    poster: trunkingPoster,
    width: 848,
    height: 478,
    alt: "Video walk-through of cable trunking fixed under the desks and along the walls",
    caption: "Video: cable trunking under the desks and along the walls",
  },
  image(PHOTOS.teamDrill),
  image(PHOTOS.socketInstall),
  image(PHOTOS.ladderRack),
  image(PHOTOS.rackCabinet),
  {
    type: "video",
    src: teamVideo,
    poster: teamPoster,
    width: 478,
    height: 850,
    alt: "Video of the Clisanco team working at the workstation desks",
    caption: "Video: the team working at the workstation desks",
  },
  image(PHOTOS.teamBriefing),
];

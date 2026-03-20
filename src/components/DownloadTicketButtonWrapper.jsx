"use client";

import dynamic from "next/dynamic";

const DownloadTicketButton = dynamic(() => import("./DownloadTicketButton"), {
  ssr: false,
});

export default function DownloadTicketButtonWrapper(props) {
  return <DownloadTicketButton {...props} />;
}

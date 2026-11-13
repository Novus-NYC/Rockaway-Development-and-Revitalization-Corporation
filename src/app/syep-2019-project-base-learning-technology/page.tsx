import type { Metadata } from "next"
import GalleryPage from "@/lib/components/gallery-page"
import type { Block } from "@/lib/content"
import blocks from "@/content/pages/syep-pbl-technology.json"

export const metadata: Metadata = {
  title: "SYEP 2019 Project Base Learning Technology",
  description: "Photographs from the technology track of RDRC's Summer Youth Employment Program 2019 Project-Based Learning.",
}

export default function Page() {
  return (
    <GalleryPage
      title="SYEP 2019 Project Base Learning Technology"
      blocks={blocks as Block[]}
      subject="SYEP 2019 Project Base Learning Technology"
      image={{ src: "/media/2019/09/IMG_1571.jpg", alt: "SYEP participants work together on the inside of a desktop computer" }}
    />
  )
}

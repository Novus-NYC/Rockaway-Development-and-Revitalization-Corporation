import type { Metadata } from "next"
import GalleryPage from "@/lib/components/gallery-page"
import type { Block } from "@/lib/content"
import blocks from "@/content/pages/syep-pbl.json"

export const metadata: Metadata = {
  title: "SYEP 2019 Project Base Learning",
  description: "Photographs from RDRC's Summer Youth Employment Program 2019 Project-Based Learning, where young people lead their own learning through inquiry.",
}

export default function Page() {
  return (
    <GalleryPage
      title="SYEP 2019 Project Base Learning"
      blocks={blocks as Block[]}
      subject="SYEP 2019 Project Base Learning"
      image={{ src: "/media/2019/10/IMG_8470-e1572538650359.jpg", alt: "Two young women present on stage to a seated panel during SYEP 2019" }}
    />
  )
}

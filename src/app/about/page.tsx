"use client"

import FileSystem from "@/components/FileSystem"
import { useState } from "react"
import { Pages } from "@/config"

export default function About() {
  const [link, setLink] = useState("/about")
  return (
    <div className="grid grid-cols-sidebar">
      <FileSystem setLink={setLink} />
      {Pages[link]}
    </div>
  )
}

import { ReactNode } from "react";
import { DirectoryInfo } from "./components/Directory";
import { FileInfo } from "./components/File";
import { FileType } from "./typings/enum";
import Homepage from "@/app/content"
import About from "@/app/about/content"

export const Files:(DirectoryInfo|FileInfo)[] = [
  {type: FileType.FILE, name: "home", link: "/"},
  {type: FileType.FILE, name: "about", link: "/about"},
  {type: FileType.DIRECTORY, name: "whatever", files: [
    {type: FileType.FILE, name: "about", link: "/about"},

  ]},
]

export const Pages:{[key: string]:ReactNode} = {
  "/": Homepage,
  "/about": About
}

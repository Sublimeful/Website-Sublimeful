import { FileSystemIcon, FileSystemItem, LevelContext, SetLinkContext } from "./FileSystem";
import { useContext } from "react";
import { FileType } from "@/typings/enum";
import { FaFile } from "react-icons/fa";

export interface FileInfo {
  type: FileType.FILE;
  name: string;
  link: string;
}

export default function File({ name, link }: FileInfo) {
  const level = useContext(LevelContext)
  const setLink = useContext(SetLinkContext)
  return (
    <LevelContext.Provider value={level + 1}>
      <FileSystemItem onClick={() => setLink(link)}>
        <FileSystemIcon>
          <FaFile />
        </FileSystemIcon>
        {name}
      </FileSystemItem>
    </LevelContext.Provider>
  )
}

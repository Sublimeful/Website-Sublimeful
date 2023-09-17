import { FaFile } from "react-icons/fa";
import { FileSystemIcon, FileType, LevelContext } from "./FileSystem";
import { useContext } from "react";

export interface FileInfo {
  type: FileType.FILE;
  name: string;
}

export default function File({ name }: FileInfo) {
  const level = useContext(LevelContext)
  return (
    <LevelContext.Provider value={level + 1}>
      <a className="flex flex-row gap-1 cursor-pointer">
          <FileSystemIcon>
            <FaFile size="10"/>
          </FileSystemIcon>
          {name}
      </a>
    </LevelContext.Provider>
  )
}

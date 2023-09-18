import { useContext, useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa"
import { FileSystemIcon, LevelContext } from "./FileSystem";
import { FileType } from "@/typings/enum";
import File, { FileInfo } from "./File";

export interface DirectoryInfo {
  type: FileType.DIRECTORY;
  name: string;
  files: (DirectoryInfo | FileInfo)[];
}

export default function Directory({ name, files }: DirectoryInfo) {
  let [opened, setOpened] = useState(false);
  const level = useContext(LevelContext);

  const contents = files.map(file => {
    if (file.type === FileType.FILE) {
      return <File type={file.type} name={file.name} link={file.link} />
    } else if (file.type === FileType.DIRECTORY) {
      return <Directory type={file.type} name={file.name} files={file.files} />
    }
  })

  return (
    <LevelContext.Provider value={level + 1}>
      <a className="flex flex-row gap-1 cursor-pointer" onClick={() => setOpened(!opened)}>
          <FileSystemIcon>
            {opened ? <FaFolderOpen size="10"/> : <FaFolder size="10"/>}
          </FileSystemIcon>
          {name}
      </a>
      {opened && contents}
    </LevelContext.Provider>
  );
}

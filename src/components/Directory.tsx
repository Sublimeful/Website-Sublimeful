import { useContext, useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa"
import { FileSystemIcon, FileSystemItem, LevelContext } from "./FileSystem";
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
      return <File type={file.type} key={file.name} name={file.name} link={file.link} />
    } else if (file.type === FileType.DIRECTORY) {
      return <Directory type={file.type} key={file.name} name={file.name} files={file.files} />
    }
  })

  return (
    <LevelContext.Provider value={level + 1}>
      <FileSystemItem onClick={() => setOpened(!opened)}>
        <FileSystemIcon>
          {opened ? <FaFolderOpen /> : <FaFolder />}
        </FileSystemIcon>
        {name}
      </FileSystemItem>
      {opened && contents}
    </LevelContext.Provider>
  );
}

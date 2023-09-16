import { ReactNode, useContext, useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa"
import { LevelContext } from "./FileSystem";

export interface DirectoryInfo {
  name: string,
  files: (DirectoryInfo)[]
}

export default function Directory({ name, files }: DirectoryInfo) {
  const SideBarIcon = (props: { icon: ReactNode }) => (
    <div className="sidebar-icon" style={{marginLeft: `${level/2}rem`}}>
      { props.icon }
    </div>
  );

  let [opened, setOpened] = useState(false);
  const level = useContext(LevelContext);

  const contents = files.map(dir =>
    <Directory name={dir.name} files={dir.files} />
  )

  return (
    <LevelContext.Provider value={level + 1}>
      <a className="flex flex-row gap-1 cursor-pointer" onClick={() => setOpened(!opened)}>
          <SideBarIcon icon={opened ? <FaFolderOpen size="10" /> : <FaFolder size="10" />} />
          {name}
      </a>
      {opened && contents}
    </LevelContext.Provider>
  );
}

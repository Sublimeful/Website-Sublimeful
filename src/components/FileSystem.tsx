"use client"

import { ReactNode, createContext, useContext } from "react";
import Directory, { DirectoryInfo } from "./Directory";
import { FileInfo } from "./File";

export enum FileType {
  DIRECTORY, FILE
}

export default function FileSystem() {
  const files: (DirectoryInfo | FileInfo)[] = [
    {
      type: FileType.DIRECTORY, name: "hello", files: [
        {
          type: FileType.FILE, name: "file"
        },
        {
          type: FileType.DIRECTORY, name: "hello", files: [
            {
              type: FileType.FILE, name: "file"
            }
          ]
        }
      ]
    },
    {
      type: FileType.FILE, name: "file"
    }
  ]

  return (
    <div className="fixed top-0 left-0 h-screen w-20 m-0
                    flex flex-col 
                    bg-gray-900 text-white text-[0.5rem] shadow-lg">
      <Directory type={FileType.DIRECTORY} name="/" files={files}/>
    </div>
  );
}

export const FileSystemIcon = ({ children }: { children: ReactNode }) => {
  const level = useContext(LevelContext);
  return (
    <div className="sidebar-icon" style={{marginLeft: `${(level-1)/2}rem`}}>
      { children }
    </div>
  );
}

export const LevelContext = createContext(0);

"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext } from "react";
import { FileType } from "@/typings/enum";
import { Files } from "@/config";
import Directory from "./Directory";

export default function FileSystem({ setLink }: { setLink: Dispatch<SetStateAction<string>> }) {
  return (
    <SetLinkContext.Provider value={setLink}>
      <div className="top-0 left-0 h-screen w-20 m-0
                      flex flex-col 
                      bg-gray-900 text-white text-[0.5rem] shadow-lg">
        <Directory type={FileType.DIRECTORY} name="/" files={Files}/>
      </div>
    </SetLinkContext.Provider>
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
const defaultSetLink:Dispatch<SetStateAction<string>> = () => {};
export const SetLinkContext = createContext(defaultSetLink);

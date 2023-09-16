"use client"

import { createContext } from "react";
import Directory, { DirectoryInfo } from "./Directory";

const FileSystem = () => {
  const files: DirectoryInfo[] = [
    {
      name: "hello", files: []
    },
    {
      name: "world", files: [
        {
          name: "foo", files: [
        {
          name: "foo", files: [
        {
          name: "foo", files: [
          ]
        }
          ]
        }
          ]
        }
      ]
    }
  ]

  return (
    <div className="fixed top-0 left-0 h-screen w-20 m-0
                    flex flex-col 
                    bg-gray-900 text-white text-[0.5rem] shadow-lg">
      <Directory name="/" files={files} />
    </div>
  );
}

export const LevelContext = createContext(0);
export default FileSystem;

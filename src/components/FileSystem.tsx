import { Dispatch, MouseEventHandler, ReactNode, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react";
import { FileType } from "@/typings/enum";
import { Files } from "@/config";
import Directory from "./Directory";

export default function FileSystem({ setLink }: { setLink: Dispatch<SetStateAction<string>> }) {
  let fileSystemDiv = useRef<HTMLDivElement>(null);
  let [drag, setDrag] = useState(false);
  let [canDrag, setCanDrag] = useState(false);

  useEffect(() => {
    const mouseMove = function(this: Window, event: MouseEvent) {
      const myDiv = fileSystemDiv.current;
      if(!myDiv) return;
      if(drag) {
        myDiv.style.width = (myDiv.getBoundingClientRect().width + event.movementX) + "px";
      }
    }
    const mouseUp = function(this: Window, event: MouseEvent) {
      event.preventDefault()
      setDrag(false)
    }
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    }
  }, [drag]);

  const mouseMove: MouseEventHandler<HTMLDivElement> = (event: React.MouseEvent) => {
    event.preventDefault()
    const myDiv = event.currentTarget
    const divRightSideX = myDiv.getBoundingClientRect().right
    const mouseX = event.clientX
    const leniency = 16  // 1rem is 16px, as defined in globals.css as :root{font-size}
    if (Math.abs(mouseX - divRightSideX) <= leniency) {
      myDiv.classList.add("cursor-ew-resize")
      setCanDrag(true)
    } else {
      myDiv.classList.remove("cursor-ew-resize")
      setCanDrag(false)
    }
  }
  const mouseDown: MouseEventHandler<HTMLDivElement> = (event: React.MouseEvent) => {
    event.preventDefault()
    if (canDrag) setDrag(true)
  }
  return (
    <SetLinkContext.Provider value={setLink}>
      <div className="top-0 left-0 h-screen w-40 m-0
                      flex flex-col
                      bg-gray-900 text-white shadow-lg"
           ref={fileSystemDiv}
           onMouseMove={mouseMove}
           onMouseDown={mouseDown}>
        <Directory type={FileType.DIRECTORY} name="/" files={Files}/>
      </div>
    </SetLinkContext.Provider>
  );
}

export const FileSystemIcon = ({ children }: { children: ReactNode }) => {
  const level = useContext(LevelContext);
  return (
    <div className="sidebar-icon mr-1" style={{marginLeft: `${(level-1)/2 + 0.5}rem`}}>
      { children }
    </div>
  );
}

export const FileSystemItem = ({children, onClick}: {children: ReactNode, onClick: Dispatch<SetStateAction<any>>}) => (
  <a className="flex flex-row gap-1 cursor-pointer items-center" style={{width: "calc(100% - 1rem)"}} onClick={onClick}>
    {children}
  </a>
)

export const LevelContext = createContext(0);
export const SetLinkContext = createContext((() => {}) as Dispatch<SetStateAction<string>>);

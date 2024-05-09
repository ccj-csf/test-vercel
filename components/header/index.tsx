import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import User from "@/components/user";
import { usePathname } from "next/navigation";
import { cs } from "@/utils";
import { Drawer, Dropdown, Space } from "antd";
import {
  CloseOutlined,
  DownOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  SmileOutlined,
} from "@ant-design/icons";

export interface Tab {
  title: string;
  name?: string;
  url?: string;
}

const navigations: Tab[] = [
  { name: "home", title: "Home", url: "/" },
  { name: "explore", title: "Explore", url: "/explore" },
  { name: "personal", title: "Personal", url: "/personal" },
];

export default function () {
  const { user } = useContext(AppContext);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <header>
      <div className="h-auto w-screen">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-row items-center px-6 py-8 lg:flex-row lg:items-center justify-between lg:px-10 lg:py-8 xl:px-20">
            <a
              href="/"
              className=" md:text-xl md:font-medium md:flex md:items-center"
            >
              <img src="/logo.png" className="w-auto h-10" alt="WAV Music" />
            </a>
            <div className="hidden md:flex ml-16 flex-1 gap-x-10">
              {navigations.map((tab: Tab, idx: number) => (
                <a
                  key={idx}
                  href={tab.url}
                  className={cs("text-md font-medium leading-6 text-gray-500", {
                    "text-secondary": pathname === tab.url,
                  })}
                >
                  {tab.title}
                </a>
              ))}
            </div>
            <Drawer
              title=""
              onClose={onClose}
              open={open}
              placement="left"
              className="!bg-black !opacity-70"
              extra={
                <div className="flex">
                  <CloseOutlined onClick={onClose} className="text-[24px]" />
                </div>
              }
            >
              <main className="space-y-4 flex flex-col">
                <a
                  className="flex justify-between items-center text-[28px] border-b border-gray-400 pb-4 text-white"
                  href="/"
                >
                  <span>home</span>
                  <RightOutlined className="text-[20px]" />
                </a>
                <a
                  className="flex justify-between items-center text-[28px] border-b border-gray-400 pb-4 text-white"
                  href="/explore"
                >
                  <span>explore</span>
                  <RightOutlined className="text-[20px]" />
                </a>
                {/* <a
                  className="flex justify-between items-center text-[28px] border-b border-gray-400 pb-4 text-white"
                  href="/personal"
                >
                  <span>personal</span>
                  <RightOutlined size={30} />
                </a> */}
                <div className=" flex flex-row items-center lg:flex lg:flex-row lg:space-x-3 lg:space-y-0 mt-2 absolute bottom-10 left-4">
                  {user === undefined ? (
                    <>loading...</>
                  ) : (
                    <>
                      {user ? (
                        <User user={user} />
                      ) : (
                        <a className="cursor-pointer" href="/si">
                          <Button>Sign In</Button>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </main>
            </Drawer>
            <div className="md:hidden">
              <MenuOutlined onClick={showDrawer} className="text-[26px]" />
            </div>
            <div className="hidden flex flex-row items-center lg:flex lg:flex-row lg:space-x-3 lg:space-y-0">
              {user === undefined ? (
                <>loading...</>
              ) : (
                <>
                  {user ? (
                    <User user={user} />
                  ) : (
                    <a className="cursor-pointer" href="/si">
                      <Button>Sign In</Button>
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

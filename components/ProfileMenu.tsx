"use client"

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Fragment, Suspense, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SessionInterface } from "@/common.types";
import { UserProfile } from "@/common.types";
import { getUser } from "@/lib/actions";
import { useGlobalContext } from "@/app/context";

type Props={
    session:SessionInterface;
}

const ProfileMenu = ({ session}: Props) => {//the menu that is showed when the user is logged and the his image
    const [openModal, setOpenModal] = useState(false);
    const { setLoader} = useGlobalContext();

    return (
        <div className="flexCenter z-10 flex-col relative">
            <Menu as="div">
                <Menu.Button className="flexCenter" onMouseEnter={() => setOpenModal(true)} >
                    {session?.user?.avatarUrl && (
                        <Image
                            src={session.user.avatarUrl}
                            width={40}
                            height={40}
                            className="rounded-full w-12 h-12"
                            alt="user profile image"
                        />
                    )}
                </Menu.Button>

                <Transition
                    show={openModal}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        static
                        className="flexStart profile_menu-items"
                        onMouseLeave={() => setOpenModal(false)}
                    >
                        <div className="flex flex-col items-center gap-y-4">
                            {session?.user?.image && (
                                <Image
                                    src={session?.user?.avatarUrl}
                                    className="rounded-full w-20 h-20"
                                    width={80}
                                    height={80}
                                    alt="profile Image"
                                />
                            )}
                            <p className="font-semibold">{session?.user?.name}</p>
                        </div>

                        <div className="flex flex-col gap-3 pt-5 items-start w-full">
                        <Menu.Item>

                                <Link href={`/profile/${session?.user?.id}`} className="text-base" >
                                <div className="flex gap-3">
                                {/**redirect to profile */}
                                <Image width={25} height={25} src={'/dog_edit.svg'} alt="gear"/>
                                <h2>Pets and Sitter Profile</h2>
                                </div>
                                    </Link>
                            </Menu.Item>
                            <div className="w-full flexStart border-t border-nav-border ">
                            </div>
                            <Menu.Item>
                                <Link href={`/edit-profile/${session?.user?.id}`} className="text-base" onClick={()=>setLoader(true)}> 
                                    <div className="flex gap-3">
                                        <Image width={25} height={25} src={'/gear.svg'} alt="gear"/>
                                        <h2>Profile Settings</h2>
                                    </div>
                                </Link>
                            </Menu.Item> 
                        </div>
                        <div className="w-full flexStart border-t border-nav-border mt-2 pt-2">
                            <Menu.Item>
                                <button type="button" className="text-md" onClick={() =>  signOut({callbackUrl: `${window.location.origin}`})}> 
                                        <div className="flex gap-3"> 
                                            <Image width={25} height={25} src={'/logOut.svg'} alt="gear"/>
                                            <h2>Sign out</h2>
                                        </div>
                                </button>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default ProfileMenu
import React from "react";
import Image from "next/image";

const  Header = () => {
    return (
        <div className="flex flex-row gap-4 items-center sm:items-center">
                <Image
                className="dark:invert"
                src="/logo-fna.png"
                alt="fna logo"
                width={180}
                height={38}
                priority
                />
                <div className="flex flex-col gap-1">
                    <b className="text-2xl">AntiMager</b>
                    <h1>Chill. List. Achieve.</h1>
                </div>
        </div>
    )
}

export default Header
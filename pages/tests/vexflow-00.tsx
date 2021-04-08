import dynamic from "next/dynamic";
import { useEffect } from "react";

const DynamicComponentWithNoSSR = dynamic(() => import("./vexflow-00-component"), { ssr: false });

const Page = () => {
    return (
        <>
            <DynamicComponentWithNoSSR />
        </>
    );
};

export default Page;

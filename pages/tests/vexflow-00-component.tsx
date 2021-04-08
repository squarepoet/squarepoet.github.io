import { useEffect } from "react";
import Vex from "vexflow";

/**
 * This page doesn't work on its own. vexflow-00.tsx loads this component dynamically (browser only).
 *
 * See: https://github.com/0xfe/vexflow/issues/833#issuecomment-767108805
 * Importing vexflow doesn't work in Next.js without a workaround.
 * You need to wrap this vexflow component in a "DynamicComponentWithNoSSR" as explained here:
 * https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
 * "You may not always want to include a module on server-side. For example, when the module includes a library that only works in the browser."
 */
const Page = () => {
    const VF = Vex.Flow;
    useEffect(() => {
        // Create an SVG renderer and attach it to the DIV element named "vf".
        const div = document.getElementById("vf");
        const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        // Configure the rendering context.
        renderer.resize(500, 500);
        const context = renderer.getContext();
        context.setFont("Arial", 10).setBackgroundFillStyle("#eed");

        // Create a stave of width 400 at position 10, 40 on the canvas.
        const stave = new VF.Stave(10, 40, 400);

        // Add a clef and time signature.
        stave.addClef("treble").addTimeSignature("4/4");

        // Connect it to the rendering context and draw!
        stave.setContext(context).draw();
    }, []);

    return (
        <>
            <div id="vf"></div>
        </>
    );
};

export default Page;

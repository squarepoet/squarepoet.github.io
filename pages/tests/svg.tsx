// @refresh reset
// disables fast refresh in Next.js for this page.

import { useEffect } from "react";
import anime from "animejs";
import Bravura from "apps/shared/music/Bravura";
import { SVG } from "@svgdotjs/svg.js";

// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use

// The glyph bounding box is defined as the smallest rectangle that encloses every part of the glyph’s path, and is described as a pair of coordinates for the
// bottom-left (or SW) and top-right (or NE) corners of the rectangle, expressed in staff spaces, relative to the glyph origin.

// In SVG, the top-left corner is the [0,0].
const SVGTests = () => {
    useEffect(() => {
        // const bbox = { x: 0, y: -4.392 * 250, width: 2.684 * 250, height: (4.392 + 2.632) * 250 };
        // const padding = 100;
        // const bboxPadded = { x: bbox.x - padding, y: bbox.y - padding, width: bbox.width + padding * 2, height: bbox.height + padding * 2 };
        // const svg = SVG().addTo("#score").viewbox(bboxPadded).size(110, 110).addClass("sheet-music");
        // const rectOrigin = svg.rect(60, 60).move(-30, -30).stroke({ color: "#f06", opacity: 1, width: 10 }).fill({opacity:0});
        // const rectBoundingBox = svg.rect(bbox.width, bbox.height).move(bbox.x, bbox.y).stroke({ color: "#f06", opacity: 1, width: 10 }).fill({opacity:0});
        // const glyph = svg.path(
        //     "M376-415C374-427 376-428 382-434C490-535 572-662 572-815C572-902 548-988 507-1048C492-1070 466-1098 455-1098C441-1098 410-1072 390-1050C316-968 292-843 292-739C292-681 299-616 306-575C308-563 309-561 297-551C153-432 0-289 0-87C0 87 119 252 364 252C387 252 413 250 433 246C444 244 446 243 448 255C460 322 475 409 475 456C475 604 375 622 316 622C262 622 236 606 236 593C236 586 245 583 268 576C299 567 335 540 335 482C335 427 300 380 239 380C172 380 132 433 132 495C132 560 171 658 322 658C389 658 519 628 519 458C519 401 501 306 490 244C488 232 489 233 503 227C604 187 671 102 671-11C671-139 577-252 430-252C404-252 404-252 401-270ZM470-943C503-943 530-916 530-861C530-750 435-660 356-591C349-585 345-586 343-599C339-625 337-659 337-691C337-847 409-943 470-943ZM361-262C364-243 364-244 346-238C258-208 201-129 201-44C201 46 248 110 316 133C324 136 336 139 343 139C351 139 355 134 355 128C355 121 347 118 340 115C298 97 268 54 268 8C268-49 307-92 368-109C384-113 386-112 388-101L438 197C440 208 439 208 424 211C408 214 388 216 368 216C193 216 80 119 80-20C80-79 90-158 173-252C233-319 279-356 326-394C336-402 338-401 340-390ZM430-103C428-115 429-118 441-117C522-110 589-42 589 46C589 109 551 160 495 188C483 194 481 194 479 182Z"
        // ).fill({color:"#181818"}).addClass("foo");

        // anime({
        //     targets: ".foo",
        //     fill: [
        //         { value: "#555", duration: 600 },
        //         { value: "#F55", duration: 600 },
        //         { value: "#181818", duration: 1200 },
        //     ],
        //     easing: "linear",
        //     loop: true,
        // });

        let glyphNumber = 0;

        for (const glyphName in Bravura.glyphs) {
            const glyphInfo = Bravura.glyphs[glyphName];

            const bboxX = glyphInfo.bBoxSW.x;
            const bboxY = -glyphInfo.bBoxNE.y;
            const bboxW = glyphInfo.bBoxNE.x - glyphInfo.bBoxSW.x;
            const bboxH = glyphInfo.bBoxNE.y - glyphInfo.bBoxSW.y;
            const bbox = { x: bboxX, y: bboxY, width: bboxW, height: bboxH };

            const viewbox = { x: -1000, y: -1000, width: 2000, height: 2000 };
            const svg = SVG()
                .addTo("#score")
                .viewbox(viewbox)
                .size(viewbox.width / 10, viewbox.height / 10)
                .addClass("sheet-music");

            // origin
            svg.circle(80).move(-40, -40).stroke({ color: "#33F", opacity: 0.8, width: 20 }).fill({ opacity: 0 });
            // x and y axis
            const axisStrokeStyle = { color: "#3FF", opacity: 0.4, width: 20 };
            const axisDashStyle = { "stroke-dasharray": "50" };
            svg.line(-2000, 0, 2000, 0).stroke(axisStrokeStyle).attr(axisDashStyle);
            svg.line(0, -2000, 0, 2000).stroke(axisStrokeStyle).attr(axisDashStyle);
            // the glyph's bounding box
            svg.rect(bboxW, bboxH).move(bboxX, bboxY).stroke({ color: "#F00", width: 10 }).fill({ opacity: 0 });
            // the glyph!
            svg.path(glyphInfo.path)
                .fill({ color: "#181818" })
                .addClass("glyph_" + glyphNumber);

            glyphNumber++;
            svg.text(glyphName).font({ size: 100 }).move(0, 0).fill({ color: "#F00" });
        }
    }, []);

    return (
        <>
            <h1>SVG</h1>
            <div id="score"></div>
            <style jsx global>{`
                .sheet-music {
                    border: 1px solid #333;
                    background-color: #d9dad7;
                    display: block;
                }
            `}</style>
        </>
    );
};

export default SVGTests;

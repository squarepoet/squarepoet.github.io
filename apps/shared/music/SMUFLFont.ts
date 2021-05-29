// All bravura_metadata.json units are expressed in staff space height = 0.25 em == 250 design units.

// 1.0 em is the height of a 5 line staff (middle of the bottom staff line to middle of the top staff line).
// https://w3c.github.io/smufl/latest/specification/scoring-metrics-glyph-registration.html
//
// All SVG units are extracted from the OTF font file, which uses 1000 design units per em.
// So each staff space is 250 design units tall.
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
//
// https://w3c.github.io/smufl/latest/specification/glyphadvancewidths.html
// https://w3c.github.io/smufl/latest/specification/glyphswithanchors.html

export interface Point {
    x: number;
    y: number;
}

export interface GlyphInfo {
    codePoint: number;
    glyphAdvanceWidth: number;
    bBoxSW: Point;
    bBoxNE: Point;
    path: string;
    anchors?: Record<string, [number, number]>;
}

interface SMUFLFont {
    fontName: string;
    fontVersion: number;
    engravingDefaults: any;
    glyphs: { [name: string]: GlyphInfo };
}

export default SMUFLFont;

namespace ComputerToPianoKeyMap {
    // which character to type to get the corresponding white key
    const labels = [
        "z",
        "x", // G A B
        "c",
        "v",
        "b",
        "n",
        "m",
        ",",
        ".", // C D E F G A B
        "/",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h", // C D E F G A B
        "j",
        "k",
        "l",
        ";",
        "q",
        "w",
        "e", // C D E F G A B
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p", // C D E F G A B
        "[",
        "]",
        "\\",
        "1",
        "2",
        "3",
        "4", // C D E F G A B
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "-", // C D E F G A B
        "=", // C
    ];

    export function getLabel(i: number): string {
        return labels[i];
    }

    export function getNumLabels(): number {
        return labels.length;
    }

    // Typing A and K should invoke the piano key "C".
    // Z should be one octave lower than A. Comma should be the same as A.
    // Q should be the same as K. I should be one octave higher than K.
    // Allowing for a customizable offset means that when we change key signatures, we can change the offset by a couple of semitones.
    // Anyways... figure this out yo!
    const numSemitonesOffset = 0;

    export function getPianoKey(keyCode: number): number {
        return keyCodeToPianoKeyNumber[keyCode] + numSemitonesOffset;
    }
    export function hasKeyCode(keyCode: number): boolean {
        return keyCode in keyCodeToPianoKeyNumber;
    }

    const keyCodeToPianoKeyNumber: Record<number, number> = {
        // Bottom Row
        90: 28, //  z => C3
        88: 30, //  x => D
        67: 32, //  c => E
        86: 33, //  v => F
        66: 35, //  b => G
        78: 37, //  n => A
        77: 39, //  m => B
        188: 40, // , => C4
        190: 42, // . => D
        191: 44, // / => E

        // Home Row
        65: 40, //  a => C4 (Middle C)
        83: 42, //  s => D
        68: 44, //  d => E
        70: 45, //  f => F
        71: 47, //  g => G
        72: 49, //  h => A
        74: 51, //  j => B
        75: 52, //  k => C5
        76: 54, //  l => E
        186: 56, // ; => F in Chrome
        59: 56, //  ; => F in Firefox
        222: 57, // ' => G

        // Top Row
        81: 52, //  q => C5
        87: 54, //  w => D
        69: 56, //  e => E
        82: 57, //  r => F
        84: 59, //  t => G
        89: 61, //  y => A
        85: 63, //  u => B
        73: 64, //  i => C6
        79: 66, //  o => D
        80: 68, //  p => E
        219: 69, // [ => F
        221: 71, // ] => G
        220: 73, // \ => A

        // Number Row
        49: 64, //  1 => C
        50: 66, //  2 => D
        51: 68, //  3 => E
        52: 69, //  4 => F
        53: 71, //  5 => G
        54: 73, //  6 => A
        55: 75, //  7 => B
        56: 76, //  8 => C
        57: 78, //  9 => D
        48: 80, //  0 => E
        189: 81, // - => F
        187: 83, // = => G
    };
}

export default ComputerToPianoKeyMap;

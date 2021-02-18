import Constants from "apps/shared/Constants";

const Instrument = Constants.Instrument;

class StringedInstrument {
    type: string;
    numStrings: number;
    numFrets: number = 13; // 0 ... 12th fret
    pianoNoteAtOpenString: number[]; // This indicates the tuning of the guitar or ukulele. Index 1 is the highest pitched string.

    constructor(instrumentType: string) {
        switch (instrumentType) {
            case Instrument.UKULELE_HIGH_G: {
                this.type = Instrument.UKULELE_HIGH_G;
                this.numStrings = 4;
                this.pianoNoteAtOpenString = [0 /* not used */, 49, 44, 40, 47];
                break;
            }
            case Instrument.UKULELE_LOW_G: {
                this.type = Instrument.UKULELE_LOW_G;
                this.numStrings = 4;
                this.pianoNoteAtOpenString = [0 /* not used */, 49, 44, 40, 35];
                break;
            }
            case Instrument.GUITAR:
            default: {
                this.type = Instrument.GUITAR; // This line is important! In case we passed in an invalid instrumentType.
                this.numStrings = 6;
                this.pianoNoteAtOpenString = [0 /* not used */, 44, 39, 35, 30, 25, 20];
                break;
            }
        }
    }
}

export default StringedInstrument;

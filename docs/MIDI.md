# MacOS

https://support.apple.com/guide/audio-midi-setup/set-up-bluetooth-midi-devices-ams33f013765/mac

# SysEx

Used to send a large amount of data to a MIDI device, such as a dump of its patch memory or sequencer data or waveform data. Also, SysEx may be used to transmit information that is particular to one model device. For example, a SysEx message might be used to set the feedback level for an operator in a Roland Physical Modeling Synth. This information would likely be useless to an AKAI sample playing device. (By contrast, virtually all devices respond to Modulation Wheel control, for example, so it makes sense to have a defined Modulation Controller message that all manufacturers can support for that purpose).

`Begins with 0xF0.`

`Ends with a 0xF7 status (ie, after the data bytes).`

Manufacturer IDs: https://www.midi.org/specifications-old/item/manufacturer-id-numbers

# WebMIDI

https://www.npmjs.com/package/webmidi

SysEx is disabled by default in Web MIDI. Depending on the browser, https might be required for SysEx.

https://webmidijs.org/docs/v2.5.2/

chrome://settings/content/midiDevices

# LUMI Keys

SysEx F0 00 21 10 77 07 01 03 00 63 F7
SysEx F0 00 21 10 77 07 01 03 00 63 F7

C SysEx F0 00 21 10 77 07 10 30 03 00 00 00 00 00 41 F7
D SysEx F0 00 21 10 77 07 10 30 43 00 00 00 00 00 01 F7
E SysEx F0 00 21 10 77 07 10 30 03 01 00 00 00 00 12 F7
F SysEx F0 00 21 10 77 07 10 30 23 01 00 00 00 00 72 F7
A SysEx F0 00 21 10 77 07 10 30 23 02 00 00 00 00 43 F7
B SysEx F0 00 21 10 77 07 10 30 63 02 00 00 00 00 03 F7

Em SysEx F0 00 21 10 77 07 10 60 22 00 00 00 00 00 5E F7

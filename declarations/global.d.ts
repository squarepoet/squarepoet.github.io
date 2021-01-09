declare global {
    namespace NodeJS {
        interface Global {
            webkitAudioContext: typeof AudioContext;
        }
    }
}
export {};

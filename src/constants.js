import { proxy } from 'valtio';

export const constants= {
    "MARVEL_PUBLIC":"ae418c63168ded3f297ae602c8b4231a",
    "MARVEL_PRIVATE":"2f0bef067292eb85a54b91dc859e57e0cb562b27",
    "MARVEL_URL":"https://gateway.marvel.com"
}

export const heroStore = proxy({
    heroImage:""
});
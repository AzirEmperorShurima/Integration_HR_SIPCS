import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const asciiArt = require('ascii-art');
// const text = 'CodeLord';
//3D-ASCII
//'Graffiti'
// export const ascii_art = asciiArt.font(text, font, (err, art) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     // console.log(art)
//     return art;
// });
export const ascii_art = (text, font) => {
    return new Promise((resolve, reject) => {
        asciiArt.font(text, font, (err, art) => {
            if (err) {
                reject(err);
            } else {
                resolve(art);
            }
        });
    });
};

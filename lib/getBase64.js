import {getPlaiceholder} from 'plaiceholder';

export default async function getBase64(imgUrl){
    try{
        const res = await fetch(imgUrl);
        console.log(res);
        if(!res.ok){
            throw new Error("Failed to fetch image "+ res.status + res.statusText);
        }
        const buffer = await res.arrayBuffer();
        const {base64 } = await getPlaiceholder(Buffer.from(buffer));

        console.log(base64);
        return base64;
    }
    catch(err){
        console.log(err.message);
    }
}

getBase64("https://res.cloudinary.com/dkaxd3wha/image/upload/w_20,e_blur:200/v1757185664/image_phea9i.jpg");
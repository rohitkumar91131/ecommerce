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
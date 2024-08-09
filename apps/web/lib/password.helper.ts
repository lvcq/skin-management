


export async function sha256(input:string){
    let enc  = new TextEncoder();
    let uint8Array = await crypto.subtle.digest("SHA-256",enc.encode(input));
    let buf =Buffer.from(uint8Array);
    return buf.toString('hex');
}

export function uuid(){
    return crypto.randomUUID()
}

export async function signClientPassword(password:string,timestamp:string,rand:string){
    let sha256Password = await sha256(password);
    let input = `${timestamp}:${sha256Password}:${rand}`;
    return await sha256(input)
}

export async function signServerPassword(password:string,timestamp:string,rand:string){
    let input = `${timestamp}:${password}:${rand}`;
    return await sha256(input)
}
export function getJwtSecretKey(): string {
    const secretKey = process.env.JWT_SECRET_KEY;
    if(!secretKey){
        console.error('Missing Jwt Secret Key');
        process.exit(1);
    }
    return secretKey;
}
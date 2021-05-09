import {environment as env} from 'src/environments/environment';


export const extractProfileImg = (user: any): string => {
    try {
        const imgUrl = user.profileImg.formats.thumbnail.url;

        return `${env.baseURL}${imgUrl}`;
    } catch {
        return env.placeholderProfileImg;
    }
}

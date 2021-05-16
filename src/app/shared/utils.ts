import {environment as env} from 'src/environments/environment';


export const extractProfileImg = (user: any): string => {
    try {
        const imgUrl = user.profileImg.formats.thumbnail.url;

        return `${env.baseURL}${imgUrl}`;
    } catch {
        return env.placeholderProfileImg;
    }
}

export const queryMultiData = (arr: any[], fieldName: string, queryParam = 'id') => {
    return arr.reduce((totalString: string, item: any, index: number) => {
        const isLastItem = index === arr.length - 1;

        return `${totalString}${queryParam}_in=${item[fieldName]}${isLastItem ? '' : '&&'}`
    }, '');
}
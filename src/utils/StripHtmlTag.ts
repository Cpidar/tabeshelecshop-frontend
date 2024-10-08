export const stripHtmlTag = (text: string) => text ? text.replace(/<style[^>]*>.*<\/style>/g, '')
    // Remove script tags and content
    .replace(/<script[^>]*>.*<\/script>/g, '')
    // Remove all opening, closing and orphan HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove leading spaces and repeated CR/LF
    .replace(/([\r\n]+ +)+/g, '') 
    : ''
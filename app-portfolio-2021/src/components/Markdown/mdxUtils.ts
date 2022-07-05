export const processContent = (content: string = '') => {
  const replaceImg = /<img /gi;
  return content.replace(replaceImg, '<CustomImg ');
};

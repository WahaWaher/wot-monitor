export const formatNickName = (str: string = ''): string => {
  return str.replace(/[^a-zA-Z0-9_-]/g, '').trim();
};

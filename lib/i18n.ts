import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  return {
    locale: "en",
    messages: (await import(`../messages/en.json`)).default
  };
});
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  if (!requested) {
    throw new Error("Locale not found");
  }
  return {
    locale: requested,
    messages: (await import(`../messages/${requested}.json`)).default
  };
});
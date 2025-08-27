// takes a imageURL and removes any './public/'
export const returnNextReadableImageURL = (imageURL: string) => {
  return imageURL.replace("file:///", "").replace("./public/", "/");
};



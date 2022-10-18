export const getAddressInfosInFile = (file: File): Promise<string[]> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const text = reader.result as string;
    const addressInfos = text.split(/\n\r|\n|\r/).filter(item => item !== "");
    resolve(addressInfos);
  };
  reader.readAsText(file);
});
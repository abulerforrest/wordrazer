// eslint-disable-next-line @typescript-eslint/ban-types
export async function delay(delay = 1000): Promise<{}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      resolve();
    }, delay);
  });
}

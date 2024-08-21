

export const hasMargin = (classString: string) => {
  return classString.includes('m-') || classString.includes('mr-') || classString.includes('ml-') || classString.includes('mt-') || classString.includes('mb-');
}
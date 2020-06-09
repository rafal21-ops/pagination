function isArrayValid(array) {
  return !!(Array.isArray(array) && array.length);
}
 
function isValidObject(settings) {
  return !(settings === null || Object.keys(settings).length === 0 || typeof settings !== 'object');
}
 
function isSettingsHasValidValues(settings) {
  if (!(typeof settings.actualPageIdx !== 'number' || typeof settings.entriesOnPage !== 'number')) {
    if (settings.actualPageIdx > 0 && settings.entriesOnPage > 0) {
      return true;
    }
  }
  return false;
}
 
function ifCanPagination(array, {actualPageIdx, entriesOnPage}) {
  return (((parseInt(actualPageIdx) * parseInt(entriesOnPage)) - (parseInt(entriesOnPage) - 1)  > array.length));
}
 
const paginateArray = (dataEntries, settings) => {
 
  if (!(isArrayValid(dataEntries) && isValidObject(settings)))
    throw new Error('Invalid input data !!!')
 
  if (!(isSettingsHasValidValues(settings)))
    throw new Error('Settings parameters are not numbers or less (equal) zero !!!')
 
  if (ifCanPagination(dataEntries, settings)) {
    throw new Error(`Can't to perform pagination !!!`)
  }
 
  const { actualPageIdx, entriesOnPage } = settings;
  const lastElementIndex = parseInt(actualPageIdx) * parseInt(entriesOnPage);
  const startingElementIndex = (parseInt(actualPageIdx)-1) * parseInt(entriesOnPage);
  const entriesOnSelectedPage = dataEntries.slice(startingElementIndex, lastElementIndex);
 
  return entriesOnSelectedPage;
 
}
console.log(paginateArray([1,2,3,4,5,6,7,8,9,10], {actualPageIdx: 5, entriesOnPage: 15}));

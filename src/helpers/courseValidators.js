const validLessons = (lessons) => {
  if(lessons.length <= 0) throw new Error(`lessons array can't be empty`);
  return true;
}

const validPrice = (price) => {
  if(
    !price.ars ||
    !price.usd ||
    !price.linkMp ||
    !price.linkPaypal
  ) throw new Error(`ars, usd, linkMp and linkPaypal can't be empty`);

  return true
}

module.exports = {
  validLessons,
  validPrice
}
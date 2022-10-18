const validQA = (qa) => {
  qa.forEach(element => {
    if ( !element.question || !element.answer ) throw new Error(`question and answer is required`);
  });
  return true
}

module.exports = {
  validQA
}
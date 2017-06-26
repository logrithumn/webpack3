async function determineDate() {
  const moment = await import('moment');
  return moment().format('LLLL');
}

determineDate()
.then(str => console.log('es2017', str));


function determineDate() {
  import('moment')
    .then(moment => moment().format('LLLL'))
    .then(str => console.log('es2015', str))
    .catch(err => console.log('Failed to load moment', err));
}

determineDate();

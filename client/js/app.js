console.log('hello');

// require('./index-es2015.js');
// require('./index-es2017.js');
import 'index-es2015';
import 'index-es2017';
// debugger;




async function get_template(template_name) {
  try {
    // let template = await import('./templates/${template_name}');
    // console.log(template);
  }
  catch(err) {
    console.log('get_template Error');
    throw new Error(err);
  }
}

get_template('one');
get_template('two');

console.log('Working module!!');

async function rus(){
  return await Promise.resolve('async working');
}

rus().then(console.log());
import app from '@shared/http/app';
import conn from '@modules/users/db/conn';


const PORT = process.env.PORT || 3000;
 
conn()
  .then(() => {
    app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
  })
  .catch((error) => {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  });

//Q1IPVdaQJAj39pdc
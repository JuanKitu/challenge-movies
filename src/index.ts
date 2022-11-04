import clc from 'cli-color';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './core/swagger.core';
import sequelize from './database/database';
import app from './app';

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
sequelize.sync().then();
app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(clc.magenta.inverse.bold(`Server on: localhost:${app.get('port')}`));
});

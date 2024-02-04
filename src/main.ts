import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MongooseExceptionFilter } from './exceptions/mongoose-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //implement validator
  app.useGlobalPipes(new ValidationPipe())
  
  app.enableCors()

  //Swagger setup
  const config = new DocumentBuilder()
  .setTitle("Clusttr APIs")
  .setDescription("APIs could change anytime")
  .setVersion('1.0')
  .build()

  //Mongoose filter
  app.useGlobalFilters(new MongooseExceptionFilter())

  const documentation = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, documentation)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

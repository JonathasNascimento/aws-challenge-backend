Acesso ao projeto

http://bucket-q3d48-aws.s3-website-us-east-1.amazonaws.com/devices

# Backend

git clone https://github.com/JonathasNascimento/aws-challenge-backend.git

## Setup backend

Para esse projeto foi usado o Node na versão v12.22.11

Após o clone do projeto:

- Instalar as dependências do package.json
  `$ yarn install`

- Renomear .env.example para .env

- No arquivo .env alterar a string de conexão com o usuário, senha e host do banco que será usado

Para subir o banco local eu usei o docker com uma imagem do mysql 8 configurado com o usuário root e senha root

`$ cd docker && docker-compose up -d`

- Após configurar o acesso ao banco é necessário gerar as configurações do Prisma com:
  `$ npx prisma generate`

- O script de geração do banco está em `prima/migration`, ou pelo comando:
  `$ npx prisma db push`

- Para subir o projeto

  `$ yarn run start:dev`
  ou

  ```
  $ npx nest build
  $ yarn run start:prod
  ```

- Para rodar os testes
  `$ yarn run test`


# Guia Detalhado para Integrar o Prisma com NestJS

## **1. Instalar o Prisma**
Primeiro, instale o Prisma como dependência de desenvolvimento:

```bash
npm install prisma --save-dev
```

### Documentação:
- [Prisma Install](https://www.prisma.io/docs/getting-started/installation)

## **2. Inicializar o Prisma**
Depois de instalar o Prisma, você precisa inicializá-lo para gerar os arquivos de configuração. Execute o comando:

```bash
npx prisma init
```

Isso criará dois arquivos importantes:
- `.env`: para definir variáveis de ambiente, como a URL de conexão com o banco de dados.
- `prisma/schema.prisma`: onde você define seus modelos e configura o banco de dados.

### Documentação:
- [Prisma Init](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch)

## **3. Configuração do Banco de Dados**

No arquivo `prisma/schema.prisma`, você configura a conexão com o banco de dados. Inicialmente, você usou o SQLite como banco de dados local. O código ficaria assim:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

O arquivo `.env` conteria a variável de conexão com o banco de dados:

```env
DATABASE_URL="file:./dev.db"
```

### Documentação:
- [Datasource Configuration](https://www.prisma.io/docs/concepts/components/prisma-schema/datasource)

## **4. Definir os Modelos no Prisma**

Defina os modelos para os usuários e postagens no arquivo `schema.prisma`:

```prisma
model User {
  id    Int    @id @default(autoincrement()) @unique
  email String @unique
  name  String
  posts Post[]
}

model Post {
  id        Int    @id @default(autoincrement()) @unique
  title     String
  content   String
  publicado Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

Aqui, o modelo `User` tem um relacionamento com o modelo `Post`. O modelo `Post` referencia um autor (`User`) por meio do campo `authorId`.

### Documentação:
- [Prisma Schema - Models](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model)

## **5. Criar e Aplicar Migrações**

Agora que você tem os modelos definidos, precisa criar e aplicar as migrações para atualizar o banco de dados:

```bash
npx prisma migrate dev --name init
```

Isso gera a migração SQL e a aplica ao banco de dados. O Prisma cria uma pasta `prisma/migrations` contendo os arquivos de migração, além de atualizar o banco de dados (no caso do SQLite, criando o arquivo `dev.db`).

### Documentação:
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)

## **6. Instalar o Prisma Client**

O Prisma Client é uma biblioteca gerada automaticamente que você usará para interagir com o banco de dados no NestJS. Instale o Prisma Client com o seguinte comando:

```bash
npm install @prisma/client
```

Ao executar este comando, o Prisma automaticamente executa o `prisma generate`, gerando o Prisma Client no seu projeto.

### Documentação:
- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)

## **7. Criar o PrismaService**

Agora, crie o `PrismaService` no NestJS para encapsular a instância do Prisma Client. Este serviço gerencia a conexão com o banco de dados.

Crie um arquivo `prisma.service.ts`:

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

Este serviço estende `PrismaClient` e implementa `OnModuleInit`, o que garante que a conexão seja estabelecida no início da aplicação.

### Documentação:
- [Prisma Service in NestJS](https://docs.nestjs.com/techniques/database#prisma)

## **8. Criar os Serviços**

Agora, crie os serviços para interagir com os dados. No NestJS, os serviços são responsáveis pela lógica de negócios, e no caso do Prisma, eles são usados para interagir com o banco de dados.

- **UserService** (`user.service.ts`):

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
    return this.prisma.user.update({
      data: params.data,
      where: params.where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
```

- **PostService** (`post.service.ts`):

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: { where: Prisma.PostWhereUniqueInput; data: Prisma.PostUpdateInput }): Promise<Post> {
    return this.prisma.post.update({
      data: params.data,
      where: params.where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
```

### Documentação:
- [Services in NestJS](https://docs.nestjs.com/providers)

## **9. Criar o Controller**

Agora, crie o controlador para expor as rotas da API. Ele usará os serviços criados para manipular os dados.

```typescript
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { User as UserModel, Post as PostModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.createPost({ id: Number(id) });
  }

  @Post('user')
  async createUser(@Body() userData: { name?: string; email: string }): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Post('post')
  async createPost(@Body() postData: { title: string; content?: string; authorEmail: string }): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }
}
```

### Documentação:
- [Controllers in NestJS](https://docs.nestjs.com/controllers)

## **10. Finalizar e Testar**

Agora, sua aplicação está pronta para ser testada. Use ferramentas como Postman ou Insomnia para testar as rotas da API, como a criação de usuários, criação de postagens e as operações de CRUD.

Sempre que alterar os modelos no `schema.prisma`, execute o comando `npx prisma generate` para regenerar o Prisma Client.

### Documentação:
- [Prisma Client Usage](https://www.prisma.io/docs/concepts/components/prisma-client)

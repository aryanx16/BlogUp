import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@aryanx16/medium-common";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: Number
  }
}>()

blogRouter.use("/*", async (c, next) => {
  const authheader = c.req.header("authorization") || ""
  try {

    const user = await verify(authheader, c.env.JWT_SECRET)
    console.log(user)
    if (user) {
      //@ts-ignore
      c.set("userId", user.id);
      await next();
    }
    else {
      c.status(403);
      return c.json({
        error: "you are not logged in "
      })
    }
  } catch (e) {
    console.log(e);
    return c.json({
      error:"you are not logged in "
    })
  }
})
blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        error:"inputs are not correct while creating post "
      })
    }
  const authorId = c.get("userId")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId)
    }
  })
  console.log(blog)
  return c.json({
    id: blog.id
  })
})
blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        error:"inputs are not correct while updating post "
      })
    }
  // const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const authorId = c.get("userId")
  await prisma.blog.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId)
    }
  })
  return c.text('Hello Hono!')
})


blogRouter.get('/bulk', async (c) => {
  console.log("--------------------------------------------------")
  try{

    const body =  c.req.json();
    const id = c.req.param('id');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true,
          }
        }
      }
    })
    console.log("--------------------------------------------------")
    console.log(blogs);
    return c.json({
      blogs
    })
  }catch(e){
    console.log(e);
    return c.json({
      error:"Erron iin bulkkkk"
    })
  }
    
})


blogRouter.get('/:id', async (c) => {
  try {

    // const body = await c.req.json();

    const id = parseInt(c.req.param("id"));
    const userId = c.get("userId");
    console.log("------------------------------------")
    console.log("userid ")
    console.log(userId);
    console.log("------------------------------------")
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.blog.findFirst({
      where: {
        id: id
      },
      select:{
        id:true,
        title:true,
        content:true,
        authorId:true,
        author:{
          select:{
            name:true
          }
        }
      }
    })
    console.log("authorId")
    console.log(userId==blog?.authorId)
    return c.json({
      blog,
      userId
    })
  } catch (e) {
    console.log(e);
    return c.json({
      error: "error in specific f"
    })
  }
})  
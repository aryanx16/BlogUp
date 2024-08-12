import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify } from 'hono/jwt'
import { signinInput, signupInput } from "@aryanx16/medium-common";

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>();

userRouter.post('/signup', async(c) => {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        error:"Inputs not correct while signing up"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
  
      const user = await prisma.user.create({
        data:{
          username:body.username,
          password:body.password,
          name:body.name
        }
      })
      const jwt = await sign({id:user.id},c.env.JWT_SECRET)
      return c.text(jwt)
    }catch(e){
      c.status(411);
      return c.text("invalid signup")
    }
  })

  userRouter.post('/signin', async(c) => {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        error:"inputs are not correct while signing in "
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
  
      const user = await prisma.user.findFirst({
        where:{
          username:body.username,
          password:body.password,
        }
      })
      if(!user){
        c.status(411);
      return c.text("invalid signin")
      }
      const jwt = await sign({id:user.id},c.env.JWT_SECRET)
      return c.text(jwt)
    }catch(e){
      c.status(411);
      return c.text("invalid signup")
    }
  })
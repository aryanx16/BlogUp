import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign,verify } from 'hono/jwt'
import { signinInput, signupInput } from "@aryanx16/medium-common";

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>();

userRouter.get('/profile/:id',async(c)=>{
  const id = c.req.param('id')
  const idd = Number(id)
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const user = await prisma.user.findFirst({
    where:{
      id:idd
    }
  })
  console.log("222222222222222222222222222222222222222222222222222222222222222222222")
  const token = await c.req.header("Authorization")||""
  console.log(token)
  console.log(token)
  console.log(token)
console.log("3333333333333333333333333333333333333")
const userposts = await prisma.blog.findMany({
  where:{
    authorId:idd
  }
})
  if(!token){
    return c.json({
      userposts,user
    })
  }
  const decoded =await verify(token,c.env.JWT_SECRET)
  const mainuserid = decoded.id || 1;
  if(!user){
    return c.text("User Not found")
  }
  return c.json({
    userposts,user,mainuserid
  })

})  
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
      const jwt = await sign({id:user.id,name:user.name},c.env.JWT_SECRET)
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
      const jwt = await sign({id:user.id,name:user.name},c.env.JWT_SECRET)
      const iddd = user.id;
     
      console.log(iddd);
      return c.text(jwt)
    }catch(e){
      c.status(411);
      return c.text("invalid signup")
    }
  })



  userRouter.get("/info",async(c)=>{
    try{
      const token = await c.req.header("Authorization")||""
      const decoded = await verify(token,c.env.JWT_SECRET)
      console.log(decoded);
      return c.json(decoded)
    }catch(e){
      console.log(e)
      return c.json({
        message:"Please Login"
      })
    }
  })
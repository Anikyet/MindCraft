import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {sign} from "hono/jwt";
// import { PrismaClient } from "../../src/generated/prisma/client.js";
import { signinInput,signupInput } from "@anikyet/mindcraft_common";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string,
    }
}>();


userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json(); 
  const {success} = signupInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
        message:"Inputs are not correct."
    })
  } 
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name,
        },
      });
      const token = await sign({id:user.id,name:user.name},c.env.JWT_SECRET);
      return c.json({token});
    } else {
      return c.json({
        msg: "User Exist",
      });
    }
  } catch (e) {
     c.status(403);
     return c.json({
      error:"Error while signing up."
     });
  }
});


userRouter.post("/signin",async (c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({
            message:"Inputs are not correct."
        })
    }
    try{
      const user = await prisma.user.findUnique({
        where:{
          email:body.email,
        }
      });

      if(!user || body.password !== user.password){
        return c.json({ error: "Invalid credentials/user does not exist." })
      }

      const token = await sign({id:user.id,name:user.name},c.env.JWT_SECRET);

      return c.json({token})
    } catch(e){
          c.status(403);
     return c.json({
      error:"Error while signing up."
     }); 
    }
});
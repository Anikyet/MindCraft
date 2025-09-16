import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { Hono } from "hono";
import {sign} from "hono/jwt";
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
      return c.json({token,username:user.name});
    } else {
      return c.json({
        msg: "User Exist",
      });
    }
  } catch (e) {
     c.status(403);
     return c.json({
      error:e
     });
  }
});


userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // 1. Validate input
    const parsed = signinInput.safeParse(await c.req.json());
    if (!parsed.success) {
      c.status(411);
      return c.json({ message: "Inputs are not correct." });
    }

    const { email, password } = parsed.data;

    // 2. Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      c.status(401);
      return c.json({ error: "User does not exist." });
    }

    // 3. Compare password
    if (password !== user.password) {
      // If using bcrypt: await bcrypt.compare(password, user.password)
      c.status(401);
      return c.json({ error: "Invalid password." });
    }

    // 4. Create JWT
    if (!c.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set in environment");
    }

    const token = await sign(
      { id: user.id, name: user.name },
      c.env.JWT_SECRET
    );

    return c.json({ token, username: user.name });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Error while login" });
  }
});

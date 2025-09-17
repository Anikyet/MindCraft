import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { Hono } from "hono";
import {sign, verify} from "hono/jwt";
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
    const parsed = signinInput.safeParse(await c.req.json());
    if (!parsed.success) {
      c.status(411);
      return c.json({ message: "Inputs are not correct." });
    }

    const { email, password } = parsed.data;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      c.status(401);
      return c.json({ error: "User does not exist." });
    }
    if (password !== user.password) {
      c.status(401);
      return c.json({ error: "Invalid password." });
    }
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

userRouter.put("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const authHeader = c.req.header("Authorization") || "";
    const token = authHeader.split(" ")[1];
    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const decoded: any = await verify(token, c.env.JWT_SECRET);
    const userIdFromToken = decoded.id;
    const userIdFromParam = c.req.param("id");

    // prevent users from editing other profiles
    if (userIdFromToken !== userIdFromParam) {
      return c.json({ error: "Forbidden" }, 403);
    }

    const body = await c.req.json<{ name: string }>();

    const updatedUser = await prisma.user.update({
      where: { id: userIdFromParam },
      data: { name: body.name },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return c.json(updatedUser);
  } catch (err) {
    return c.json({ error: "Something went wrong" }, 500);
  }
});

userRouter.get("/me", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const authHeader = c.req.header("Authorization") || "";
    const token = authHeader.split(" ")[1];

    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const decoded: any = await verify(token, c.env.JWT_SECRET);
    const id = decoded.id;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json({ user }); 
  } catch (err) {
    return c.json({ error: "Invalid token or server error" }, 500);
  }
});
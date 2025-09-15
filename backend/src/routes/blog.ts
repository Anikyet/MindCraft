import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify, decode } from "hono/jwt";
import { createBlogInput,updateBlogInput } from "@anikyet/mindcraft_common";
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userId:string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("Authorization")|| "";
    
    try{
        const token = authHeader.split(" ")[1];
        const response = await verify(token, c.env.JWT_SECRET);
            if (response) {
        c.set("userId",response.id as string);
        await next();
    } else {
        return c.json({
            msg: "Unauthorised access"
        })
    }
    } catch (e){
        c.json({message:"wrong/empty token"})
    }

});


blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success }  = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Invalid input fields to create the blog."
        })
    }
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: c.get('userId'),
        }
    })

    return c.json({
        id: (await blog).id
    })
});

blogRouter.put("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
        if(!success){
        c.status(411);
        return c.json({
            message:"Invalid input fields to update the blog."
        })
    }
    const blog = await prisma.post.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
        }
    });

    return c.json({
        id: blog.id
    });

});



blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                } 
            }
        }
    });
    if(blogs){
    return c.json({
        blogs: blogs
    });
    } else {
        return c.json({
            msg:"No Blog Found..."
        })
    }


});
blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const blog = await prisma.post.findUnique({
        where: {
            id: id,
        },
        select:{
            id:true,
            title:true,
            content:true,
            published:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    if (!blog) {
        return c.json({ error: "Blog not found" }, 404);
    }
    return c.json(blog);
});

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

// blogRouter.use('/blog/*', async (c, next) => {
//     const authHeader = c.req.header("Authorization")|| "";
    
//     try{
//         const token = authHeader.split(" ")[1];
//         const response = await verify(token, c.env.JWT_SECRET);
//             if (response) {
//         c.set("userId",response.id as string);
//         await next();
//     } else {
//         return c.json({
//             msg: "Unauthorised access"
//         })
//     }
//     } catch (e){
//         c.json({message:"wrong/empty token"})
//     }

// });

blogRouter.use('/blog/*', async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";

    try {
        const token = authHeader.split(" ")[1];
        const response = await verify(token, c.env.JWT_SECRET);
        if (response) {
            c.set("userId", response.id as string);
            await next();
            return; // important to finalize context
        } else {
            return c.json({ msg: "Unauthorised access" }, 401);
        }
    } catch (e) {
        return c.json({ message: "wrong/empty token" }, 401);
    }
});



blogRouter.post("/blog/create", async (c) => {
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
            published: body.published,
        }
    })

    return c.json({
        id: blog.id
    })
});

blogRouter.put("/blog/update", async (c) => {
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
        where:{
            published:true
        },
        select:{
            id:true,
            title:true,
            content:true,
            createdAt:true,
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

blogRouter.get('/bulk' ,async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
        where:{
            published:true,
        },
        select:{
            id:true,
            title:true,
            content:true,
            published:true,
            createdAt:true,
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

})

blogRouter.get('/blog/userPosts' ,async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
        where:{
            published:true,
            authorId:c.get("userId")
        },
        select:{
            id:true,
            title:true,
            content:true,
            published:true,
            createdAt:true,
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

})


blogRouter.get('/blog/drafts' , async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
        where:{
            published:false,
            authorId:c.get("userId")
        },
        select:{
            id:true,
            title:true,
            content:true,
            published:true,
            createdAt:true,
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

blogRouter.put("/blog/publish", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

        if (!body.id) {
            return c.json({ message: "Blog ID is required to publish." }, 411);
        }

        const blog = await prisma.post.update({
            where: {
                id: body.id,
                authorId: c.get("userId"), // ensure only owner can publish
            },
            data: {
                published: true,
            },
        });

        return c.json({
            id: blog.id,
            message: "Blog published successfully."
        });
    } catch (err) {
        return c.json({ message: "Failed to publish blog." }, 500);
    }
});

blogRouter.delete("/blog/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogId = c.req.param("id");

        if (!blogId) {
            return c.json({ message: "Blog ID is required." }, 411);
        }

        // Get logged-in user ID from middleware
        const userId = c.get("userId");
        if (!userId) {
            return c.json({ message: "Unauthorized" }, 401);
        }

        // Delete the blog only if it belongs to the logged-in user
        const deleted = await prisma.post.deleteMany({
            where: {
                id: blogId,
                authorId: userId,
            },
        });

        if (deleted.count === 0) {
            return c.json({ message: "Blog not found or unauthorized." }, 404);
        }

        return c.json({
            id: blogId,
            message: "Blog deleted successfully."
        });
    } catch (err: any) {
        return c.json({ message: "Failed to delete blog.", error: err.message }, 500);
    }
});

blogRouter.post('/blog/comment', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json<{ id: string; comment: string }>();
    const authorId = c.get("userId"); // we set this in middleware after verifying JWT

    if (!body.id || !body.comment) {
      return c.json({ message: "Post ID and comment are required" }, 400);
    }

    // Create comment
    const newComment = await prisma.comment.create({
      data: {
        content: body.comment,
        postId: body.id,
        authorId: authorId,
      },
      include: {
        author: { select: { id: true, name: true } },
        post:   { select: { id: true, title: true } },
      },
    });

    return c.json({ message: "Comment added successfully", comment: newComment });
  } catch (err: any) {
    return c.json({ message: "Failed to create comment", error: err.message }, 500);
  }
});

blogRouter.get('/blog/comments/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const postId = c.req.param("id");

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: {
          select: { name: true }, // only send author name
        },
      },
      orderBy: { createdAt: "desc" }, // latest first
    });

    return c.json({
      comments: comments.map((cmt) => ({
        id: cmt.id,
        content: cmt.content,
        author: cmt.author.name,
        createdAt: cmt.createdAt,
      })),
    });
  } catch (err: any) {
    return c.json(
      { message: "Failed to fetch comments", error: err.message },
      500
    );
  }
});
blogRouter.delete('/blog/comments/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const commentId = c.req.param("id"); // get the comment ID from URL

    if (!commentId) {
      return c.json({ message: "Comment ID is required" }, 400);
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return c.json({ message: "Comment deleted successfully" });
  } catch (err: any) {
    return c.json(
      { message: "Failed to delete comment", error: err.message },
      500
    );
  } finally {
    await prisma.$disconnect();
  }
});

blogRouter.get('/blog/fav', async (c) =>{
      const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  try {
    const authorId = c.get("userId");

    const blogs = await prisma.fav.findMany({
      where: { authorId },
select: {
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            published:true,
            createdAt:true,
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });


    return c.json({ blogs });
  } catch (err: any) {
    return c.json({ message: "Failed to fetch favorite status", error: err.message }, 500);
  } 
})

blogRouter.get("/blog/isFav/:id", async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  try {
    const postId = c.req.param("id");
    const authorId = c.get("userId");

    const fav = await prisma.fav.findUnique({
      where: { authorId_postId:  {authorId, postId: postId } },
    });

    return c.json({ isFav: !!fav });
  } catch (err: any) {
    return c.json({ message: "Failed to fetch favorite status", error: err.message }, 500);
  } 
});


blogRouter.post('/blog/markFav' , async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
     
    try {
    const body = await c.req.json();
    const authorId = c.get("userId");

    if (!body.id) return c.json({ message: "Blog ID is required" }, 411);

    // Check if favorite already exists
    const existingFav = await prisma.fav.findUnique({
      where: { authorId_postId:  {authorId, postId: body.id }  },
    });

    if (existingFav) {
      // Exists → remove it
      await prisma.fav.delete({
        where: { authorId_postId:  {authorId, postId: body.id } },
      });
      return c.json({ message: "Blog unfavorited", isFav: false });
    } else {
      // Doesn’t exist → create it
      await prisma.fav.create({
        data: { authorId, postId: body.id },
      });
      return c.json({ message: "Blog marked as favorite", isFav: true });
    }
    }  catch (err: any) {
    return c.json({ message: "Failed to toggle favorite", error: err.message }, 500);
  } 
})

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
            createdAt:true,
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
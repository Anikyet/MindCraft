import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password:z.string().min(3),
    name: z.string()
})


export const signinInput = z.object({
    email: z.string().email(),
    password:z.string().min(3)
})


export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    tags: z.string(),
    published: z.boolean().optional(),
});


export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
});


// export type SignupInput = z.infer<typeof signupInput>;
// export type SigninInput = z.infer<typeof signinInput>;

// export type CreateBlogInput = z.infer<typeof createBlogInput>;
// export type UpdateBlogInput = z.infer<typeof updateBlogInput>;

// Auth input types
export type SignupInput = {
  email: string;      // must be a valid email
  password: string;   // minimum 3 characters
  name: string;
};

export type SigninInput = {
  email: string;      // must be a valid email
  password: string;   // minimum 3 characters
};

// Blog input types
export type CreateBlogInput = {
  title: string;
  content: string;
  published?:boolean;
  tags?:string;
};

export type UpdateBlogInput = {
  id: string;         // the blog ID
  title: string;
  content: string;
  tags?: string;
};

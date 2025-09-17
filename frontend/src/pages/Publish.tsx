import { useRef, useState } from "react";
import SimpleMDEEditor from "react-simplemde-editor";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Publish = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<string>("");
  const simpleMdeRef = useRef<EasyMDE | null>(null);
  const editorInitialized = useRef(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (value: string) => {
    contentRef.current = value;
  };

  function saveDraft() {
    const data = {
      title: titleRef.current?.value || "",
      content: contentRef.current || "",
      published: false,
    };
    handleSubmit(data);
  }

  function publishBlog(){
       const data = {
      title: titleRef.current?.value || "",
      content: contentRef.current || "",
      published: true,
    };
    handleSubmit(data); 
  }

  const handleSubmit = async ({ title, content, published }: any) => {
    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        `${BACKEND_URL}/api/v1/post/blog/create`,
        { title, content, published },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Done!");

      if (titleRef.current) titleRef.current.value = "";
      contentRef.current = "";
      simpleMdeRef.current?.value(""); // reset editor

      simpleMdeRef.current?.codemirror.focus();
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <input
        type="text"
        placeholder="Enter blog title"
        ref={titleRef}
        className="w-full p-2 border rounded-lg"
      />

      <SimpleMDEEditor
        value={contentRef.current}
        onChange={handleChange}
        getMdeInstance={(instance: EasyMDE) => {
          if (!editorInitialized.current) {
            simpleMdeRef.current = instance;
            editorInitialized.current = true;
          }
        }}
        options={{
          spellChecker: false,
          placeholder: "Write your blog post here...",
          autofocus: true,
          toolbar: [
            "bold",
            "italic",
            "heading",
            "|",
            "quote",
            "unordered-list",
            "ordered-list",
            "|",
            "link",
            "code",
            "table",
            "horizontal-rule",
            "|",
            "preview",
            "side-by-side",
            "fullscreen",
          ],
        }}
      />
      <button
        onClick={saveDraft}
        disabled={loading}
        className="px-4 py-2 mx-4 bg-slate-400 text-white rounded-lg hover:bg-slate-500 disabled:opacity-50"
      >
        {loading ? "Processing....." : "Draft Post"}
      </button>
      <button
        onClick={publishBlog}
        disabled={loading}
        className="px-4 py-2 mx-4 bg-black text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? "Processing......." : "Publish Post"}
      </button>
    </div>
  );
};
export default Publish;
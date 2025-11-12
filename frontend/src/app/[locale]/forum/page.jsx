"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import api from "../lib/axios"; // your custom axios instance
import { useTranslations } from "next-intl";
import { MdPostAdd } from "react-icons/md";



export default function ForumPage() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const t = useTranslations("forum")

  // ✅ Fetch posts with axios instance
  useEffect(() => {
    api.get("/forum")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // ✅ Handle submit new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await api.post("/forum", {
        user: session.user.name,
        email: session.user.email,
        content,
      });

      setPosts([res.data.post, ...posts]); // use returned post
      setContent("");
    } catch (err) {
      console.error("Error posting:", err);
    }
  };

  return (

    
    <main className="min-h-[90svh] pt-24 pb-8 px-4 flex flex-col items-center lg:min-w-[800px] bg-yellow-500 dark:bg-transparent">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow">🌍 {t("Forum")}</h1>

      {/* Post form (only if logged in) */}
      {status === "authenticated" ? (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col justify-center items-center w-full ">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience..."
            className="w-full p-3 rounded-lg bg-black/10 dark:bg-black text-white placeholder:text-white"
          />
          <button
            type="submit"
            className="flex justify-center items-center gap-3 mt-4 px-4 py-2 rounded-lg bg-black/20 hover:bg-black/30 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition-all  text-white w-32"
          >
            {t("Post")}
            <MdPostAdd  className="text-lg"/>
          </button>
        </form>
      ) : (
        <p className="text-white mb-5">{t("PleaseSign")}</p>
      )}


      {/* Posts list */}
      <div className="space-y-4 w-full">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-4 rounded-lg bg-black/10 dark:bg-black text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{post.user}</span>
            </div>
            <p className="text-sm leading-relaxed">{post.content}</p>
            <span className="text-xs">
              {new Date(post.date).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        ))}
      </div>

    </main>
  );
}

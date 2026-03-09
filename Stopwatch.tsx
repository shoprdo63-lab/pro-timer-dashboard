import * as React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { ArrowLeft, Clock, User, Calendar, ChevronRight, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogSectionProps {
  isStandalone?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ isStandalone = false }) => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  
  const selectedPost = BLOG_POSTS.find(p => p.id === postId) || null;

  const handleSelectPost = (post: BlogPost | null) => {
    if (post) {
      navigate(`/blog/${post.id}`);
    } else {
      navigate('/blog');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedPost) {
    return (
      <section className="w-full py-12 md:py-24 bg-slate-950/40 animate-in fade-in duration-500">
        <div className="max-w-4xl mx-auto px-6">
          <button 
            onClick={() => handleSelectPost(null)}
            className="flex items-center space-x-2 text-white/40 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Knowledge Hub</span>
          </button>

          <header className="mb-16 border-l-[6px] pl-10" style={{ borderColor: selectedPost.accentColor }}>
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60">
                {selectedPost.category}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">
                {selectedPost.date}
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-light text-white mb-8 leading-tight">
              {selectedPost.title}
            </h1>
            <p className="text-white/40 text-2xl italic font-serif max-w-4xl">
              {selectedPost.subtitle}
            </p>
            
            <div className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-white/5">
              {selectedPost.author && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-white/40" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-white/20">Author</span>
                    <span className="text-sm text-white/60">{selectedPost.author}</span>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-white/20">Read Time</span>
                  <span className="text-sm text-white/60">{selectedPost.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="prose prose-invert max-w-none text-white/70 leading-relaxed text-xl space-y-8 text-justify">
            <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
          </div>

          <div className="mt-24 pt-12 border-t border-white/5 flex justify-between items-center">
             <div className="text-white/20 text-xs uppercase tracking-[0.4em] font-bold">
                End of Research Article — Ref: {selectedPost.id.toUpperCase()}
             </div>
             <button 
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    handleSelectPost(null);
                }}
                className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest"
             >
                Return to Top
             </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full py-24 ${!isStandalone ? 'border-t border-white/5' : ''} bg-slate-950/40`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Authority Header */}
        <div className="flex flex-col items-center mb-24 text-center">
          <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-[0.4em] mb-8">
            <BookOpen className="w-4 h-4" />
            <span>The YClockTB Professional Resource Hub</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-8">Temporal Mastery</h2>
          <p className="text-white/40 max-w-3xl text-xl leading-relaxed">
            Our Knowledge Hub provides authoritative insights into the physics of synchronization, the neurobiology of focus, and the technical architecture of global timekeeping. Explore our 50-article deep-dive series.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id}
              onClick={() => handleSelectPost(post)}
              className="group relative p-8 rounded-[40px] bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer flex flex-col h-full hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to bottom right, ${post.accentColor}, transparent)` }}></div>
              
              <div className="flex items-center justify-between mb-8">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
                  {post.category}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-2xl font-light text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                {post.title}
              </h3>
              
              <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-3">
                {post.subtitle}
              </p>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3 h-3 text-white/20" />
                  <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{post.date}</span>
                </div>
                <div className="flex items-center space-x-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Read</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Conclusion / Authority Banner */}
        <div className="mt-48 p-20 rounded-[80px] bg-gradient-to-br from-blue-600/20 via-slate-900 to-purple-600/10 border border-white/10 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-light text-white mb-8">The Professional Standard</h3>
              <p className="text-white/50 max-w-4xl mx-auto text-xl leading-relaxed">
                YClockTB isn't just a utility; it's a commitment to professional excellence. Whether you're managing global infrastructure or your personal focus, we provide the precision you need to dominate your time.
              </p>
            </div>
        </div>
      </div>
    </section>
  );
};

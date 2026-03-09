@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --accent: #3b82f6;
}

/* Custom Scrollbar - Minimal & Non-Intrusive */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #0f172a;
  color: white;
  font-family: 'Inter', sans-serif;
  overflow: hidden; /* Critical: Prevent body scroll to stop "double scrollbar" issues */
}

#root {
  height: 100vh;
  width: 100vw;
}

@layer components {
  .glass-panel {
    @apply bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl;
  }
  
  .glass-card {
    @apply bg-white/5 backdrop-blur-md border border-white/5 hover:border-white/10 transition-all duration-300;
  }

  .view-container {
    @apply w-full max-w-6xl mx-auto flex flex-col gap-12 py-8;
  }

  .btn-primary {
    @apply px-6 py-3 rounded-2xl font-bold tracking-widest uppercase text-xs transition-all active:scale-95 shadow-lg;
  }
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}

/* Animation for the Math Challenge */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.2s ease-in-out 0s 2;
}

/* Blog Content Styles */
.blog-content h1 {
  font-size: 2.25rem;
  font-weight: 300;
  color: white;
  margin-bottom: 2rem;
  margin-top: 3rem;
}

.blog-content h2 {
  font-size: 1.875rem;
  font-weight: 300;
  color: white;
  margin-bottom: 1.5rem;
  margin-top: 2.5rem;
}

.blog-content h3 {
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

.blog-content p {
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.625;
}

.blog-content ul, .blog-content ol {
  margin-bottom: 1.5rem;
  margin-left: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.blog-content ul {
  list-style-type: disc;
}

.blog-content ol {
  list-style-type: decimal;
}

.blog-content li {
  margin-bottom: 0.5rem;
}

.blog-content strong {
  color: white;
  font-weight: 600;
}

.blog-content blockquote {
  border-left-width: 4px;
  border-color: rgba(255, 255, 255, 0.2);
  padding-left: 1.5rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.blog-content code {
  background-color: rgba(255, 255, 255, 0.1);
  padding-left: 0.375rem;
  padding-right: 0.375rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  color: rgba(255, 255, 255, 0.9);
}

.blog-content pre {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 1rem;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.blog-content pre code {
  background-color: transparent;
  padding: 0;
}

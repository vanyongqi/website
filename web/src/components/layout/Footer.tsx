export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-slate-900/50 backdrop-blur-sm">
      <div className="container px-4 py-6">
        <div className="text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} 猿代码. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/contexts/ThemeContext"
import { Upload, X, Save, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PublishCode() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    language: "",
    framework: "",
    category: "",
    tags: [] as string[],
    previewImages: [] as string[],
    codeFile: null as File | null,
    version: "1.0.0"
  })
  const [tagInput, setTagInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 提交逻辑
    console.log("发布代码:", formData)
    // 成功后跳转
    navigate("/seller")
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    })
  }

  const bgGradient = theme === "light" 
    ? "from-blue-50 via-cyan-50/60 to-blue-50"
    : "from-slate-950 via-purple-950 to-slate-950"
  const textColor = theme === "light" ? "text-slate-900" : "text-white"

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} ${textColor} pl-4 pr-2 lg:pl-6 lg:pr-4 xl:pl-8 xl:pr-6`}>
      <div className="max-w-4xl mx-auto py-8">
        {/* 头部 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            发布新代码
          </h1>
          <p className="text-slate-400">分享你的代码作品，开始你的创作之旅</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>填写代码项目的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 标题 */}
              <div className="space-y-2">
                <Label htmlFor="title">项目标题 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="例如：React 管理后台系统"
                  className="bg-slate-800 border-slate-700 text-white"
                  required
                />
              </div>

              {/* 描述 */}
              <div className="space-y-2">
                <Label htmlFor="description">项目描述 *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="详细描述你的代码项目，包括功能、技术栈、使用场景等..."
                  className="bg-slate-800 border-slate-700 text-white min-h-[120px]"
                  required
                />
              </div>

              {/* 价格和分类 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">价格 (¥) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0"
                    min="0"
                    className="bg-slate-800 border-slate-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">分类 *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">前端框架</SelectItem>
                      <SelectItem value="backend">后端服务</SelectItem>
                      <SelectItem value="fullstack">全栈项目</SelectItem>
                      <SelectItem value="mobile">移动开发</SelectItem>
                      <SelectItem value="tools">工具库</SelectItem>
                      <SelectItem value="data">数据可视化</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 技术栈 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">编程语言 *</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="选择语言" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JavaScript">JavaScript</SelectItem>
                      <SelectItem value="TypeScript">TypeScript</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="Java">Java</SelectItem>
                      <SelectItem value="Go">Go</SelectItem>
                      <SelectItem value="C++">C++</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="framework">框架/库</Label>
                  <Input
                    id="framework"
                    value={formData.framework}
                    onChange={(e) => setFormData({ ...formData, framework: e.target.value })}
                    placeholder="例如：React, Vue, Express"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              {/* 标签 */}
              <div className="space-y-2">
                <Label htmlFor="tags">标签</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                    placeholder="输入标签后按回车添加"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline" className="border-slate-700">
                    添加
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 hover:text-red-400"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* 代码文件上传 */}
              <div className="space-y-2">
                <Label>代码文件 *</Label>
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-slate-500" />
                  <p className="text-sm text-slate-400 mb-2">
                    上传你的代码文件（支持 ZIP、RAR 格式）
                  </p>
                  <Input
                    type="file"
                    accept=".zip,.rar,.7z"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setFormData({ ...formData, codeFile: file })
                    }}
                    className="bg-slate-800 border-slate-700 text-white hidden"
                    id="codeFile"
                  />
                  <Label
                    htmlFor="codeFile"
                    className="cursor-pointer inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-md text-sm"
                  >
                    选择文件
                  </Label>
                  {formData.codeFile && (
                    <p className="text-sm text-cyan-400 mt-2">{formData.codeFile.name}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 操作按钮 */}
          <div className="flex items-center justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              className="border-slate-700 text-white hover:bg-slate-800"
              onClick={() => navigate("/seller")}
            >
              取消
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-slate-700 text-white hover:bg-slate-800"
            >
              <Save className="h-4 w-4 mr-2" />
              保存草稿
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0"
            >
              <Eye className="h-4 w-4 mr-2" />
              预览并发布
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


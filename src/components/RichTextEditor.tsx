"use client";
import { useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2 as Link2Icon,
  Image as ImageIcon,
  PlayCircle,
  Grid2X2,
  MoreHorizontal,
  Code2,
  ChevronDown,
  Palette,
} from "lucide-react";

const CustomEditor = ({ initialContent = "" }) => {
  const [selectedParagraphStyle, setSelectedParagraphStyle] =
    useState("Paragraph");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable default heading to use our custom one
      }),
      TextStyle,
      Color,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      // Update link when URL changes
      if (linkUrl && showLinkInput) {
        if (linkUrl === "") {
          editor.chain().focus().extendMarkRange("link").unsetLink().run();
        } else {
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: linkUrl })
            .run();
        }
        setShowLinkInput(false);
        setLinkUrl("");
      }
    },
  });

  if (!editor) {
    return null;
  }

  const toggleHeading = (level: number) => {
    if (editor.isActive("heading", { level })) {
      editor.chain().focus().setParagraph().run();
      setSelectedParagraphStyle("Paragraph");
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
      setSelectedParagraphStyle(`Heading ${level}`);
    }
  };

  const handleLinkClick = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    // Get selected text
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, " ");

    // If text is selected, use it as default URL text
    if (text) {
      setLinkUrl(text);
    }
    setShowLinkInput(true);
    editor.commands.focus();
  };

  return (
    <div className="bg-gray-200 rounded-4xl min-h-[150px]">
      {/* Custom editor toolbar */}
      <div className="flex flex-wrap items-center bg-gray-300 rounded-full py-1.5 px-3 md:px-5 mb-0.5 gap-1 md:gap-0">
        {/* Paragraph/Heading dropdown - always visible */}
        <div className="relative group">
          <button className="flex items-center px-2 py-1 text-xs md:text-sm text-gray-700 hover:bg-gray-400 rounded">
            <span className="hidden sm:inline">{selectedParagraphStyle}</span>
            <span className="sm:hidden">P</span>
            <ChevronDown className="ml-1 w-3 h-3 md:w-4 md:h-4" />
          </button>

          {/* Dropdown menu */}
          <div className="absolute z-10 hidden group-hover:block bg-white rounded-md shadow-lg min-w-[160px]">
            <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Paragraph
            </button>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <button
                key={level}
                onClick={() => toggleHeading(level)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  editor.isActive("heading", { level }) ? "font-bold" : ""
                }`}
                style={{
                  fontSize: `${1.5 - level * 0.1}rem`,
                  lineHeight: 1.3,
                }}
              >
                Heading {level}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-400 mx-1 hidden sm:block"></div>

        {/* Text formatting - always visible */}
        <button
          className={`p-1 hover:bg-gray-400 rounded ${
            editor.isActive("bold") ? "bg-gray-400" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-3 h-3 md:w-4 md:h-4" />
        </button>
        <button
          className={`p-1 hover:bg-gray-400 rounded ${
            editor.isActive("italic") ? "bg-gray-400" : ""
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-3 h-3 md:w-4 md:h-4" />
        </button>
        <button
          className={`p-1 hover:bg-gray-400 rounded ${
            editor.isActive("underline") ? "bg-gray-400" : ""
          }`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="w-3 h-3 md:w-4 md:h-4" />
        </button>

        {/* Color selector - hidden on small screens */}
        <div className="hidden sm:block">
          <button
            className="p-1 hover:bg-gray-400 rounded"
            onClick={() => {
              const color =
                editor.getAttributes("textStyle").color || "#000000";
              const newColor = color === "#000000" ? "#FF0000" : "#000000";
              editor.chain().focus().setColor(newColor).run();
            }}
          >
            <Palette className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-400 mx-1 hidden sm:block"></div>

        {/* Alignment - hidden on small screens */}
        <div className="hidden sm:flex items-center">
          <button
            className={`p-1 hover:bg-gray-400 rounded ${
              editor.isActive({ textAlign: "left" }) ? "bg-gray-400" : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft className="w-3 h-3 md:w-4 md:h-4" />
          </button>
          <button
            className={`p-1 hover:bg-gray-400 rounded ${
              editor.isActive({ textAlign: "center" }) ? "bg-gray-400" : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter className="w-3 h-3 md:w-4 md:h-4" />
          </button>
          <button
            className={`p-1 hover:bg-gray-400 rounded ${
              editor.isActive({ textAlign: "right" }) ? "bg-gray-400" : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-400 mx-1 hidden sm:block"></div>

        {/* Link - always visible */}
        <button
          className={`p-1 hover:bg-gray-400 rounded ${
            editor.isActive("link") ? "bg-gray-400" : ""
          }`}
          onClick={handleLinkClick}
        >
          <Link2Icon className="w-3 h-3 md:w-4 md:h-4" />
        </button>

        {/* Media buttons - in more menu on small screens */}
        <div className="hidden sm:block">
          <button className="p-1 hover:bg-gray-400 rounded">
            <ImageIcon className="w-3 h-3 md:w-4 md:h-4" />
          </button>
          <button className="p-1 hover:bg-gray-400 rounded">
            <PlayCircle className="w-3 h-3 md:w-4 md:h-4" />
          </button>
          <button className="p-1 hover:bg-gray-400 rounded">
            <Grid2X2 className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>

        {/* More options dropdown for small screens */}
        <div className="sm:hidden relative">
          <button
            className="p-1 hover:bg-gray-400 rounded"
            onClick={() => setShowMoreOptions(!showMoreOptions)}
          >
            <MoreHorizontal className="w-3 h-3 md:w-4 md:h-4" />
          </button>

          {showMoreOptions && (
            <div className="absolute right-0 mt-1 bg-white rounded-md shadow-lg p-2 z-10 grid grid-cols-3 gap-1 w-[180px]">
              {/* Color */}
              <button
                className="p-1 hover:bg-gray-100 rounded flex justify-center"
                onClick={() => {
                  const color =
                    editor.getAttributes("textStyle").color || "#000000";
                  const newColor = color === "#000000" ? "#FF0000" : "#000000";
                  editor.chain().focus().setColor(newColor).run();
                  setShowMoreOptions(false);
                }}
              >
                <Palette className="w-4 h-4" />
              </button>

              {/* Align Left */}
              <button
                className={`p-1 hover:bg-gray-100 rounded flex justify-center ${
                  editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  editor.chain().focus().setTextAlign("left").run();
                  setShowMoreOptions(false);
                }}
              >
                <AlignLeft className="w-4 h-4" />
              </button>

              {/* Align Center */}
              <button
                className={`p-1 hover:bg-gray-100 rounded flex justify-center ${
                  editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  editor.chain().focus().setTextAlign("center").run();
                  setShowMoreOptions(false);
                }}
              >
                <AlignCenter className="w-4 h-4" />
              </button>

              {/* Align Right */}
              <button
                className={`p-1 hover:bg-gray-100 rounded flex justify-center ${
                  editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  editor.chain().focus().setTextAlign("right").run();
                  setShowMoreOptions(false);
                }}
              >
                <AlignRight className="w-4 h-4" />
              </button>

              {/* Image */}
              <button
                className="p-1 hover:bg-gray-100 rounded flex justify-center"
                onClick={() => setShowMoreOptions(false)}
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              {/* Video */}
              <button
                className="p-1 hover:bg-gray-100 rounded flex justify-center"
                onClick={() => setShowMoreOptions(false)}
              >
                <PlayCircle className="w-4 h-4" />
              </button>

              {/* Grid */}
              <button
                className="p-1 hover:bg-gray-100 rounded flex justify-center"
                onClick={() => setShowMoreOptions(false)}
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Code block - always visible */}
        <button
          className={`p-1 hover:bg-gray-400 rounded ml-auto ${
            editor.isActive("codeBlock") ? "bg-gray-400" : ""
          }`}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code2 className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>

      {/* Editor content area */}
      <div className="p-3 min-h-[120px] focus:outline-none">
        <EditorContent editor={editor} className="prose" />
      </div>

      {/* Bubble menu for text formatting */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex bg-gray-300 rounded-full p-1">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1 rounded ${
                editor.isActive("bold") ? "bg-gray-400" : ""
              }`}
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1 rounded ${
                editor.isActive("italic") ? "bg-gray-400" : ""
              }`}
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              className={`p-1 hover:bg-gray-400 rounded ${
                editor.isActive("underline") ? "bg-gray-400" : ""
              }`}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>
          </div>
        </BubbleMenu>
      )}
    </div>
  );
};

export default CustomEditor;

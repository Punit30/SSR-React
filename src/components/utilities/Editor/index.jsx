import { EditorContent, useEditor } from "@tiptap/react"
import React from "react"
import Document from "@tiptap/extension-document"
import ListItem from "@tiptap/extension-list-item"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import BulletList from "@tiptap/extension-bullet-list"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import OrderedList from "@tiptap/extension-ordered-list"
import Heading from "@tiptap/extension-heading"
import { Box, IconButton } from "@mui/material"
import { FiBold } from "react-icons/fi"
import { styled } from "@mui/styles"

const Button = styled(IconButton)(({ theme, open }) => ({
	padding: "4px !important",
}))

function Editor() {
	const editor = useEditor({
		extensions: [
			Document,
			Paragraph,
			Text,
			BulletList,
			ListItem,
			OrderedList,
			Heading,
			Bold,
			Italic,
			Underline,
			Link,
		],
		content: ``,
	})

	if (!editor) return null
	return (
		<Box className="f f-c b-r8" border="1px solid #D9DAE6">
			<Box className="f align-center flex-wrap g4 p8">
				<IconButton onClick={() => editor.chain().focus().toggleBold().run()}>
					<FiBold size="18" color={editor.isActive("bold") ? "red" : "#000"} />
				</IconButton>
				<IconButton
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive("bulletList") ? "is-active" : ""}
				>
					toggleBulletList
				</IconButton>
				<IconButton
					onClick={() => editor.chain().focus().splitListItem("listItem").run()}
					disabled={!editor.can().splitListItem("listItem")}
				>
					splitListItem
				</IconButton>
				<IconButton
					onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
					disabled={!editor.can().sinkListItem("listItem")}
				>
					sinkListItem
				</IconButton>
				<IconButton
					onClick={() => editor.chain().focus().liftListItem("listItem").run()}
					disabled={!editor.can().liftListItem("listItem")}
				>
					liftListItem
				</IconButton>
			</Box>

			<EditorContent editor={editor} />
		</Box>
	)
}

export default Editor

import React, { useState, useEffect, useMemo } from "react"
import UiGroup from "../UiGroup/UiGroup"
import PostLink from "../PostLink/PostLink"
import UiSelect from "../UiSelect/UiSelect"

const tagFilterOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "article",
    label: "Articles",
  },
  {
    value: "project",
    label: "Projects",
  },
  {
    value: "log",
    label: "Log",
  },
]

const PostListing = ({ graphqlEdges }) => {
  const [selectedTag, setSelectedTag] = useState("all")

  useEffect(() => {
    console.log(selectedTag)
  }, [selectedTag])

  const handleChange = (tag) => {
    setSelectedTag(tag)
  }

  const filteredPosts = useMemo(() => {
    return graphqlEdges.filter((edge) => {
      const { frontmatter } = edge.node
      return (
        !!frontmatter.date &&
        (selectedTag === "all" || frontmatter.tags?.includes(selectedTag))
      )
    })
  }, [graphqlEdges, selectedTag])

  const Posts = filteredPosts.map((edge) => (
    <PostLink
      key={edge.node.id}
      date={edge.node.frontmatter.date}
      title={edge.node.frontmatter.title}
      link={edge.node.frontmatter.slug}
    />
  ))

  return (
    <UiGroup
      title="Posts"
      controls={
        <UiSelect
          options={tagFilterOptions}
          values={selectedTag}
          onChange={handleChange}
          name="post-filter-select"
        />
      }
    >
      <div>{Posts}</div>
    </UiGroup>
  )
}

export default PostListing

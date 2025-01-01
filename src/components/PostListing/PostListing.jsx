import React, { useState, useEffect, useMemo } from "react"
import UiGroup from "../UiGroup/UiGroup"
import PostLink from "../PostLink/PostLink"
import UiSelect from "../UiSelect/UiSelect"

const tagFilterOptions = [
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
  {
    value: "all",
    label: "All",
  },
]

const PostListing = ({ graphqlEdges }) => {
  const [tagFilter, setTagFilter] = useState({ value: "all", label: "All" })

  const filteredPosts = useMemo(() => {
    return graphqlEdges.filter((edge) => {
      const { frontmatter } = edge.node
      return (
        !!frontmatter.date &&
        (tagFilter.value === "all" ||
          frontmatter.tags?.includes(tagFilter?.value))
      )
    })
  }, [graphqlEdges, tagFilter])

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
      // controls={
      //   <UiSelect
      //     defaultValue={tagFilter}
      //     onChange={setTagFilter}
      //     options={tagFilterOptions}
      //     placeholder="Filter..."
      //   />
      // }
    >
      <div>{Posts}</div>
    </UiGroup>
  )
}

export default PostListing

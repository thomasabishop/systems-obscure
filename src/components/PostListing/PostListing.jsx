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
  // const [tagFilter, setTagFilter] = useState({ value: "all", label: "All" })

  // const filteredPosts = useMemo(() => {
  //   return graphqlEdges.filter((edge) => {
  //     const { frontmatter } = edge.node
  //     return (
  //       !!frontmatter.date &&
  //       (tagFilter.value === "all" ||
  //         frontmatter.tags?.includes(tagFilter?.value))
  //     )
  //   })
  // }, [graphqlEdges, tagFilter])

  const [currentPage, setCurrentPage] = useState(0)

  const postsPerPage = 18
  const totalPages = Math.ceil(graphqlEdges.length / postsPerPage)
  const currentPosts = useMemo(() => {
    const startIndex = currentPage * postsPerPage
    const endIndex = startIndex + postsPerPage
    return graphqlEdges.slice(startIndex, endIndex)
  }, [graphqlEdges, currentPage, postsPerPage])

  const hasNextPage = (currentPage + 1) * postsPerPage < graphqlEdges.length
  const hasPrevPage = currentPage > 0

  // Navigation functions
  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(currentPage - 1)
    }
  }

  const loadMorePosts = () => {
    setCurrentPage(currentPage + 1)
  }

  const Posts = currentPosts.map((edge) => (
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
      footer={
        <div className="post-listing-footer">
          <button
            className={hasPrevPage ? "button-active" : ""}
            onClick={goToPrevPage}
          >
            Prev
          </button>
          <span>
            {currentPage + 1} of {totalPages}{" "}
          </span>
          <button
            className={hasNextPage ? "button-active" : ""}
            onClick={goToNextPage}
          >
            Next
          </button>
        </div>
      }
      // controls={
      //   <UiSelect
      //     defaultValue={tagFilter}
      //     onChange={setTagFilter}
      //     options={tagFilterOptions}
      //     placeholder="Filter..."
      //   />
      // }
    >
      <div className="post-listing-body">{Posts}</div>
    </UiGroup>
  )
}

export default PostListing

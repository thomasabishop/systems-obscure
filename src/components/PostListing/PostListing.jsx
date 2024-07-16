import React, { useState, useEffect, useMemo } from "react"
import UiGroup from "../UiGroup/UiGroup"
import PostLink from "../PostLink/PostLink"
import UiSelect from "../UiSelect/UiSelect"
import Select from "react-select"

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

const customStyles = {
  control: (base) => ({
    ...base,
    height: 10,
    minHeight: 20,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    //   height: "20px",
    padding: "0px 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: 0,
  }),

  indicator: (provided, state) => ({
    ...provided,
    height: 30,
    width: 30,
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    height: 10,
    width: 10,
  }),

  indicatorSeparator: (state) => ({
    display: "none",
  }),
}

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
        <Select
          options={tagFilterOptions}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={customStyles}
        />
      }
    >
      <div>{Posts}</div>
    </UiGroup>
  )
}

export default PostListing

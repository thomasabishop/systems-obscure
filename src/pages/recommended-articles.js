import React, { useState, useEffect } from "react"
import Main from "../templates/main/Main"
import axios from "axios"
import { formatUnixTimestamp } from "../helpers/formatUnixTimestamp"

const ENDPOINT = process.env.GATSBY_POCKET_LAMBDA_ENDPOINT

const ArticleListing = ({ article }) => {
  return (
    <tr>
      <td>
        <a href={article?.resolved_url} target="_blank">
          {article?.resolved_title}
        </a>
      </td>
      <td>{formatUnixTimestamp(article?.time_added)}</td>
    </tr>
  )
}

export default function RecommendedArticlesPage() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${ENDPOINT}?tag=website`)
        setData(response?.data?.data?.list)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const articles = Object.keys(data).map((key) => data[key])
  return (
    <Main>
      <div className="page-header">
        <h1 className="page-h1">Recommended articles</h1>
      </div>
      <p>
        Articles written by others that I have learned from or which present interesting viewpoints.
      </p>

      <table className="articles-table">
        <thead className={loading ? "loading" : ""}>
          <tr>
            <th>Title</th>
            <th>Date added</th>
          </tr>
        </thead>
        <tbody>
          {articles?.map((article) => (
            <ArticleListing key={article?.item_id} article={article} />
          ))}
        </tbody>
      </table>
    </Main>
  )
}

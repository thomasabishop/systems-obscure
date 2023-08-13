import React, { useState, useEffect } from "react"
import Main from "../templates/main/Main"
import axios from "axios"
import { formatUnixTimestamp } from "../helpers/formatUnixTimestamp"
import PageHeader from "../components/PageHeader/PageHeader"
import useSessionStorage from "../hooks/useSessionStorage"
const ENDPOINT = process.env.GATSBY_POCKET_AWS_LAMBDA_ENDPOINT

const ArticleListing = ({ article }) => {
  return (
    <tr>
      <td>
        <a href={article?.resolved_url} target="_blank" rel="noreferrer">
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
  const [storedData, setStoredData] = useSessionStorage("so_recommended_articles", {})
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (Object.keys(storedData).length) {
        setData(storedData)
        setLoading(false)
      } else {
        try {
          const response = await axios.get(`${ENDPOINT}?tag=website`)
          console.log(response)
          setStoredData(response?.data?.data?.list)
          setData(response?.data?.data?.list)
          setLoading(false)
        } catch (err) {
          console.error(err)
        }
      }
    }
    fetchData()
  }, [storedData, setStoredData])

  const articles = Object.keys(data).map((key) => data[key])
  return (
    <Main>
      <PageHeader headerTitle="Recommended articles" />
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

import React, { useState, useEffect } from "react"
import Main from "../templates/main/Main"
import axios from "axios"

const localEndpoint = "http://127.0.0.1:3000/query-pocket/get-articles-by-tag?tag=website"

const formatDate = (unixTimestamp) => {
  unixTimestamp = Number(unixTimestamp)
  let date = new Date(unixTimestamp * 1000)

  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  let day = date.getDate()
  let month = monthNames[date.getMonth()]
  let year = date.getFullYear()

  return day + " " + month + " " + year
}

const ArticleListing = ({ article }) => {
  return (
    <tr>
      <td>
        <a href={article?.resolved_url} target="_blank">
          {article?.resolved_title}
        </a>
      </td>
      <td>{formatDate(article?.time_added)}</td>
    </tr>
  )
}

export default function RecommendedArticlesPage() {
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(localEndpoint)
        setData(response?.data?.data?.list)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  console.log(data)
  const articles = Object.keys(data).map((key) => data[key])
  console.log(articles)
  return (
    <Main>
      <div className="page-header">
        <h1 className="page-h1">Recommended articles</h1>
      </div>
      <p>
        Articles written by others that I have learned from or which present interesting viewpoints.
      </p>

      <table>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Title</th>
            <th>Date added</th>
          </tr>
        </thead>
        <tbody>
          {articles &&
            articles?.map((article) => <ArticleListing key={article?.item_id} article={article} />)}
        </tbody>
      </table>
    </Main>
  )
}

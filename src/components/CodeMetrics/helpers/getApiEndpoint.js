import generateDateParameters from "./generateDateParameters"

const basePath = "http://127.0.0.1:3000/query-wakatime"

function getApiEndpoint(deployment, endpoint, timePeriod) {
  switch (deployment) {
    case "local":
      if (endpoint === "durations") {
        if (
          timePeriod === "last_6_months" ||
          timePeriod === "last_year" ||
          timePeriod === "all_time"
        ) {
          return `${basePath}/${endpoint}${generateDateParameters(timePeriod)}`
        } else {
          return `${basePath}/${endpoint}?timePeriod=${timePeriod}`
        }
      }
      return `${basePath}/${endpoint}?timePeriod=${timePeriod}`
  }
}

export default getApiEndpoint

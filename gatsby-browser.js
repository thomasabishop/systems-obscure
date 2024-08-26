require("./src/prismjs.css")
require(`katex/dist/katex.min.css`)

exports.onClientEntry = () => {
  if (typeof window !== "undefined") {
    // Ensure we're in the browser environment
    function isWindowsChromeOrEdge() {
      const userAgent = window.navigator.userAgent.toLowerCase()
      const isChromium = /chrome|crios/.test(userAgent)
      const isEdge = /edg/.test(userAgent)
      const isWindows = /win/.test(userAgent)
      return (isChromium || isEdge) && isWindows
    }

    if (isWindowsChromeOrEdge()) {
      document.documentElement.classList.add("windows-chrome-edge")
    }
  }
}

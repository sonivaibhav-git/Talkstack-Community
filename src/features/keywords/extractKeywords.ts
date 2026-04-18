type KeywordResult = {
  keyword: string
  score: number
}

const DEFAULT_STOPWORDS = new Set([
 "a","an","the","and","or","but","if","then","else","when","at","by","for",
  "in","of","on","to","with","without","is","are","was","were","be","been",
  "being","have","has","had","do","does","did","doing","done",
  "this","that","these","those","it","its","it’s","as","from","into",
  "about","than","so","such","too","very","can","cannot","will","just",
  "not","no","yes","you","your","yours","we","our","ours","they","them",
  "their","theirs","he","she","him","her","his","hers","i","me","my","mine",

  "ok","okay","yeah","yep","nope","lol","lmao","rofl","haha","hahaha",
  "wow","omg","wtf","idk","imo","imho","btw","tbh","irl",
  "bro","dude","guys","pls","please","thanks","thank","thx",

  "edit","update","edited","upvote","downvote","comment","comments",
  "post","posted","share","shared","like","liked","follow","following",
  "subscribe","subscribed","thread","topic",

  "thing","things","stuff","something","anything","everything","nothing",
  "someone","anyone","everyone","people","person","guy","girl",

  "make","makes","making","made","get","gets","getting","got",
  "go","goes","going","went","gone","come","comes","coming",
  "see","sees","seeing","saw","seen","app","types","page","code","build","critical","text","asking","great","haven't","i'm","ist",
  "know","knows","knowing","knew","known",
  "think","thinks","thinking","thought",

  "really","basically","actually","literally","seriously",
  "maybe","probably","possibly","kind","sort","kinda","sorta",

  "here","there","where","why","how","what","which","who","whom","before","after","link"

  ,"first","second","third","next","last","minimum","maximum","locate","located","changes"

  ,"http","https","www","com","now","any","anything", "actually", "doing","more","clean"
])

const URL_REGEX = /https?:\/\/[^\s]+/g
const WORD_REGEX = /[a-zA-Z0-9'-]+/g

const normalize = (text: string): string => {
  return text
    .replace(URL_REGEX, " ")
    .normalize("NFKD")
    .replace(/[^\w\s'-]/g, " ")
    .toLowerCase()
}

const tokenize = (text: string): string[] => {
  const matches = text.match(WORD_REGEX)
  return matches ? matches : []
}

const cleanToken = (token: string): string => {
  return token
    .replace(/^[-']+|[-']+$/g, "")
}

const isValidToken = (token: string): boolean => {
  if (!token) return false
  if (token.length < 3) return false
  if (/^\d+$/.test(token)) return false
  if (DEFAULT_STOPWORDS.has(token)) return false
  return true
}

const computeFrequency = (
  tokens: string[],
  weight: number,
  map: Map<string, number>
) => {
  for (const raw of tokens) {
    const token = cleanToken(raw)
    if (!isValidToken(token)) continue
    const prev = map.get(token) ?? 0
    map.set(token, prev + weight)
  }
}

export const extractKeywords = (
  title: string,
  content: string,
  limit = 10
): KeywordResult[] => {
  const freq = new Map<string, number>()

  const safeTitle = title?.trim() ?? ""
  const safeContent = content?.trim() ?? ""

  if (!safeTitle && !safeContent) return []

  const normalizedTitle = normalize(safeTitle)
  const normalizedContent = normalize(safeContent)

  const titleTokens = tokenize(normalizedTitle)
  const contentTokens = tokenize(normalizedContent)

  computeFrequency(titleTokens, 3, freq)
  computeFrequency(contentTokens, 1, freq)

  const results: KeywordResult[] = Array.from(freq.entries())
    .map(([keyword, score]) => ({
      keyword,
      score: score * Math.log(1 + score)
    }))
    .sort((a, b) => {
      if (b.score === a.score) {
        return a.keyword.localeCompare(b.keyword)
      }
      return b.score - a.score
    })

  return results.slice(0, limit)
}
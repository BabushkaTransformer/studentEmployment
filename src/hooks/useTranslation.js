import { useLocalStorage } from "./useLocalStorage"
import * as translations from "../language"

export const useTranslation = () => {
  const [language, setLanguage] = useLocalStorage("language", "ru")
  const [fallbackLanguage, setFallbackLanguage] = useLocalStorage(
    "fallbackLanguage",
    "ru"
  )

  const translate = key => {
    const keys = key.split(".")

    return (
      getNestedTranslation(language, keys) ??
      getNestedTranslation(fallbackLanguage, keys) ??
      key
    )
  }

  return {
    language,
    setLanguage,
    fallbackLanguage,
    setFallbackLanguage,
    t: translate,
  }
}

function getNestedTranslation(language, keys) {
  return keys.reduce((obj, key) => {
    return obj?.[key]
  }, translations[language])
}
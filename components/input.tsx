'use client'
import { badges } from "@/constants";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";

interface Data {
  word: string,
  root_word: string,
  part_of_speech: string
}

interface WordFromBackend {
  original_text: string,
  results: Data[]
}

const Input = () => {
  const [word, setWord] = useState("")
  const [data, setData] = useState<WordFromBackend>()
  const [loading, setLoading] = useState(false)

  const submit = () => {
      if (!word) return alert("Please send in an english word");

      setLoading(true)

      axios.post("https://root-word-originator-ml-backend.vercel.app/root", {
        word
      }).then(res => {
        console.log(res.data);
        setData(res.data)
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setLoading(false)
      })
  }

  const clickedWord = (text: string) => {
    setWord(text)
    setLoading(true)
    axios.post("https://root-word-originator-ml-backend.vercel.app/root", {
        word: text
      }).then(res => {
        console.log(res.data);
        setData(res.data)
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setLoading(false)
      })
  }
    
  return (
    <>
        <ul className="flex gap-5">
            {badges.map((word) => (
              <button disabled={loading} onClick={() => clickedWord(word.name)} key={word.id} className="border p-1 rounded-full px-5 cursor-pointer border-gray-400 transition-all duration-300 ease-in-out active:scale-95">{word.icon} {word.name}</button>
            ))}
          </ul>
      <div className="max-w-3xl w-full border rounded-2xl p-5 mt-5 shadow-2xl border-[#582aff] flex items-center gap-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-[#582aff]" />
        <input type="text" value={word} onChange={e => setWord(e.target.value) } className="w-full bg-transparent outline-none border-none text-[#582aff]" placeholder="Search any English words to get its root word" />
        <button onClick={submit} disabled={loading}><PaperAirplaneIcon  className=" h-5 w-5 cursor-pointer transition-all duration-300 ease-in-out active:scale-95 hover:text-[#582aff] rotate-[-90deg] hover:rotate-0 " /></button>
      </div>
      <div className="max-w-2xl w-full flex flex-col gap-5">
        <p className="text-sm italic text-gray-500 text-center">Your root word will appear here... <span className="text-[#582aff]">{data && data.results.map(r => r.root_word).join(", ")}</span></p>
        <p className="text-sm italic text-gray-500 text-center">Part of Speech of {word}: <span className="text-[#582aff]">{data && data.results.map(r => r.part_of_speech).join(", ")}</span></p>
      </div>
    </>
  )
}

export default Input

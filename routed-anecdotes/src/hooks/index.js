import { useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    inputProps: { type, value, onChange },
    reset
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(setAnecdotes)
  }, [])

  const addAnecdote = (anecdote) => {
    anecdoteService.createNew(anecdote).then((created) => {
      setAnecdotes((current) => current.concat(created))
    })
  }

  const deleteAnecdote = (id) => {
    anecdoteService.remove(id).then(() => {
      setAnecdotes((current) => current.filter((a) => a.id !== id))
    })
  }

  return { anecdotes, addAnecdote, deleteAnecdote }
}

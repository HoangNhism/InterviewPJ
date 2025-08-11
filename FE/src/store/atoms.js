import { atom } from 'jotai'

export const newTaskTitleAtom = atom('')
export const newTaskDescriptionAtom = atom('')

export const isCreatingTaskAtom = atom(false)

export const taskFilterAtom = atom('all')

export const resetFormAtom = atom(
  null,
  (get, set) => {
    set(newTaskTitleAtom, '')
    set(newTaskDescriptionAtom, '')
  }
)

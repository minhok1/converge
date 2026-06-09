import en from './en.json'

type Dictionary = typeof en

function getValue(path: string, dictionary: Dictionary): string {
  const segments = path.split('.')
  let current: unknown = dictionary

  for (const segment of segments) {
    if (typeof current !== 'object' || current === null || !(segment in current)) {
      return path
    }
    current = (current as Record<string, unknown>)[segment]
  }

  return typeof current === 'string' ? current : path
}

export function t(path: string): string {
  return getValue(path, en)
}

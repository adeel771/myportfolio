export function supportsWebGL() {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl') || canvas.getContext('webgl2'))
  } catch {
    return false
  }
}

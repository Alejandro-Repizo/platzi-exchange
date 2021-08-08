/**
 * Importamos la libreria numeral,
 * esta nos va a servir para formatear los valores
 * y mostrar un valor mas facil de leer para el
 * usuario
 */
import numeral from 'numeral'

const dollarFilter = (value) => {
  if (!value) return '$ 0'

  return numeral(value).format('($ 0.00a)')
}

const percentFilter = (value) => {
  if (!value) return '0%'

  // Con Number lo pasamos de string a numero
  return `${Number(value).toFixed(2)}%`
}

export { dollarFilter, percentFilter }

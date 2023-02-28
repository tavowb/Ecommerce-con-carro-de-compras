import { useId } from 'react'
import { useFilters } from '../hooks/useFilters'
import './Filter.css'

export function Filter () {
  const { filters, setFilters } = useFilters()
  const minPriceId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (e) => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: e.target.value
    })
    )
  }

  const handleChangeCategory = (e) => {
    setFilters(prevState => ({
      ...prevState,
      category: e.target.value
    })
    )
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceId}>Precio minimo</label>
        <input
          className='input-range'
          aria-label='Precio minimo'
          onChange={handleChangeMinPrice}
          type='range'
          id={filters.minPrice}
          min={0}
          max={1000}
          value={filters.minPrice}
        />
        <span> {filters.minPrice} </span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>category</label>
        <select id={categoryFilterId} defaultValue={filters.category} onChange={handleChangeCategory}>
          <option value='all'>all</option>
          <option value='fragrances'>Colonias</option>
          <option value='home-decoration'>Cosas del hogar</option>
          <option value='laptops'>laptops</option>
          <option value='smartphones'>Celulares</option>
          <option value='skincare'>Cuidado de la piel</option>
          <option value='groceries'>Comestibles</option>
        </select>
      </div>
    </section>
  )
}

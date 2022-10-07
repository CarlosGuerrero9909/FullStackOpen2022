export const Filter = ({ _filterCountry, _handleFilterCountry }) => (
  <div>
    <form>
      Find countries <input value={_filterCountry} onChange={_handleFilterCountry}/>
    </form>
  </div>
)


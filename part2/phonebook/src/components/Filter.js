export const Filter = ({ _filterName, _handleFilterName }) => (
  <div>
    <form>
      filter shown with <input value={_filterName} onChange={_handleFilterName}/>
    </form>
  </div>
)


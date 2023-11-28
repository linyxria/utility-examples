import { useChinaAreaMap } from "~/hooks/china"


const Breadcrumbs = ({
  adcodes,
  onSelect,
}: {
  adcodes: number[]
  onSelect: (adcode: number) => void
}) => {
  const { data: chinaAreaMap } = useChinaAreaMap('adcode')

  return (
    <div className="text-sm breadcrumbs absolute top-0 left-0 z-10">
      <ul>
        {adcodes.map((adcode, index, array) => (
          <li key={adcode}>
            <button
              className={
                index === array.length - 1
                  ? 'cursor-default'
                  : 'hover:underline'
              }
              onClick={() => onSelect(adcode)}
            >
              {chinaAreaMap.get(adcode)?.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Breadcrumbs

interface UnvalidatedNumberProps {
  count: number
}

export const UnvalidatedNumber = ({ count }: UnvalidatedNumberProps) => (
  <span id="unvalidated-number" class="unvalidated-number">
    {count}
  </span>
)
